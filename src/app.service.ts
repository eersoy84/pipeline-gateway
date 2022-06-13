import { Injectable } from '@nestjs/common';
import { LOW_PRIORITY, PRIORITY_LEVEL, WALLET_REQUEST_TOPIC } from './app.constants';
import { WalletRequestDto } from './dto';
import { KafkaService } from './kafka/kafka.service';

@Injectable()
export class AppService {
  constructor(private kafka: KafkaService) {}

  async fetchWallet(dto: WalletRequestDto) {
    await this.kafka.send(WALLET_REQUEST_TOPIC, dto);
  }
}
