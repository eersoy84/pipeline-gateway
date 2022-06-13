import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { Admin, Kafka } from 'kafkajs';
import {
  ADMIN_SERVICE,
  WALLET_REQUEST_TOPIC,
  NUM_PARTITIONS,
  REPLICATION_FACTOR,
  WALLET_SERVICE,
  MURMUR_SERVICE,
} from 'src/app.constants';
import { Murmur2 } from './murmur2';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private producer: Producer;
  private admin: Admin;
  private logger: Logger;

  constructor(
    @Inject(WALLET_SERVICE) private readonly kafkaClient: ClientKafka,
    @Inject(ADMIN_SERVICE) private readonly adminClient: Kafka,
    @Inject(MURMUR_SERVICE) private readonly murmur: Murmur2,
  ) {
    this.admin = this.adminClient.admin();
    this.logger = new Logger(KafkaService.name);
  }
  async onModuleInit() {
    await this.initializeAdmin();
    await this.initializeProducer();
  }

  async onModuleDestroy() {
    await this.kafkaClient.close();
    await this.admin.disconnect();
  }

  private async initializeAdmin() {
    await this.admin.connect();
    const isTopicCreated = await this.createTopics();
    if (!isTopicCreated) {
      this.logger.verbose(`Topic ${WALLET_REQUEST_TOPIC} already exist with ${NUM_PARTITIONS} partitions...`);
      return;
    }
    this.logger.verbose(`Topic ${WALLET_REQUEST_TOPIC} is created with ${NUM_PARTITIONS} partitions...`);
  }
  private async initializeProducer() {
    this.producer = await this.kafkaClient.connect();
  }

  async fetchTopicOfsets(topic: string) {
    return await this.admin.fetchTopicOffsets(WALLET_REQUEST_TOPIC);
  }

  getAdmin(): Admin {
    return this.admin;
  }

  getProducer(): Producer {
    return this.producer;
  }

  async createTopics(): Promise<boolean> {
    return await this.admin.createTopics({
      topics: [
        {
          topic: WALLET_REQUEST_TOPIC,
          numPartitions: NUM_PARTITIONS,
          replicationFactor: REPLICATION_FACTOR,
        },
      ],
    });
  }

  async send(topic: string, dto: any) {
    const { userId, priority } = dto;
    const partition = this.murmur.getPartition(userId, priority);
    await this.producer.send({
      topic,
      acks: -1,
      messages: [{ value: JSON.stringify(dto), partition }],
    });
  }
}
