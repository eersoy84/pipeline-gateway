import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MURMUR_SERVICE, WALLET_SERVICE, ADMIN_SERVICE } from 'src/app.constants';
import { KafkaService } from './kafka.service';
import { Kafka } from 'kafkajs';
import { Murmur2 } from './murmur2';

const adminService = {
  provide: ADMIN_SERVICE,
  useFactory: () => {
    return new Kafka({
      clientId: 'adminService',
      brokers: [process.env.KAFKA_BROKER_URL],
    });
  },
};

const murmurService = {
  provide: MURMUR_SERVICE,
  useFactory: () => {
    return new Murmur2();
  },
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: WALLET_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'walletService',
            brokers: [process.env.KAFKA_BROKER_URL],
            connectionTimeout: 3000,
            // logLevel: logLevel.DEBUG,
          },
          producer: {
            idempotent: true,
          },
        },
      },
    ]),
  ],
  providers: [murmurService, adminService, KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
