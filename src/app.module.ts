import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FETCH_NFT_WALLET_SERVICE } from './app-constants';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: FETCH_NFT_WALLET_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'pipeline-gateway',
            brokers: [process.env.KAFKA_BROKER_URL],
          },
          consumer: {
            groupId: 'fetch_nft_data_for_wallet_consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
