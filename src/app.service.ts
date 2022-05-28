import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { FETCH_NFT_WALLET_SERVICE } from './app-constants';
import { NftForWalletRequestDto } from './dto';

@Injectable()
export class AppService {
  constructor(@Inject(FETCH_NFT_WALLET_SERVICE) private readonly fetchNftWalletClient: ClientKafka) {}

  fetchNftForWalletRequest(dto: NftForWalletRequestDto) {
    this.fetchNftWalletClient.emit('fetch_nft_data_for_wallet', dto);
  }
}
