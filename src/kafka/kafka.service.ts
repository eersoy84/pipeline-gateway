import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { Admin, Kafka } from 'kafkajs';
import {
  WALLET_REQUEST_TOPIC,
  NUM_PARTITIONS,
  REPLICATION_FACTOR,
  WALLET_SERVICE,
  MURMUR_SERVICE,
  FILTER_NFT_DATA_TOPIC,
  FETCH_NFT_DATA_TOPIC,
} from 'src/app.constants';
import { Murmur2 } from './murmur2';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private admin: Admin;
  private logger: Logger;

  constructor(
    @Inject(WALLET_SERVICE) private readonly clientKafka: ClientKafka,
    @Inject(MURMUR_SERVICE) private readonly murmur: Murmur2,
  ) {
    this.kafka = this.clientKafka.createClient<Kafka>();
    this.logger = new Logger(KafkaService.name);
  }
  async onModuleInit() {
    await this.initializeAdmin();
    await this.initializeProducer();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    await this.admin.disconnect();
  }

  private async initializeAdmin() {
    this.admin = this.kafka.admin();
    this.admin.connect();
    const isTopicCreated = await this.createTopics();
    if (!isTopicCreated) {
      this.logger.verbose(`${WALLET_REQUEST_TOPIC} topic already exist with ${NUM_PARTITIONS} partitions...`);
      return;
    }
    this.logger.verbose(`Creating ${WALLET_REQUEST_TOPIC} with ${NUM_PARTITIONS} partitions...`);
  }
  private async initializeProducer() {
    this.logger.verbose('initializing producer...');
    this.producer = this.kafka.producer();
    this.producer.connect();
  }

  async createTopics(): Promise<boolean> {
    return await this.admin.createTopics({
      timeout: 2000,
      topics: [
        {
          topic: WALLET_REQUEST_TOPIC,
          numPartitions: NUM_PARTITIONS,
          replicationFactor: REPLICATION_FACTOR,
        },
        {
          topic: FILTER_NFT_DATA_TOPIC,
          numPartitions: NUM_PARTITIONS,
          replicationFactor: REPLICATION_FACTOR,
        },
        {
          topic: FETCH_NFT_DATA_TOPIC,
          numPartitions: NUM_PARTITIONS,
          replicationFactor: REPLICATION_FACTOR,
        },
      ],
    });
  }

  async send(topic: string, dto: any, priority?: string) {
    const { userId } = dto;
    const partition = this.murmur.getPartition(userId, priority);
    await this.producer.send({
      topic,
      acks: -1,
      messages: [{ value: JSON.stringify(dto), partition }],
    });
  }
}
