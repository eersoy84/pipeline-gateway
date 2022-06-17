import { Injectable } from '@nestjs/common';
import { PRIORITY_LEVEL, WALLET_REQUEST_TOPIC } from './app.constants';
import { WalletRequestDto } from './dto';
import { KafkaService } from './kafka/kafka.service';

@Injectable()
export class AppService {
  constructor(private kafka: KafkaService) {}

  async fetchWallet(dto: WalletRequestDto, priority: string) {
    await this.kafka.send(WALLET_REQUEST_TOPIC, dto, priority);
  }
}
