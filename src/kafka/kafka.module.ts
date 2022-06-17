import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MURMUR_SERVICE, WALLET_SERVICE } from 'src/app.constants';
import { KafkaService } from './kafka.service';
import { Murmur2 } from './murmur2';

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
          consumer: {
            groupId: 'fetchNftForWallet-consumer-group',
          },
        },
      },
    ]),
  ],
  providers: [murmurService, KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
