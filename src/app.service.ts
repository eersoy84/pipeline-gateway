import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { FETCH_APARTMENT_FOR_WALLET_SERVICE, FETCH_NFT_WALLET_SERVICE } from './app.constants';
import { NftForWalletRequestDto } from './dto';

@Injectable()
export class AppService {
  constructor(
    @Inject(FETCH_NFT_WALLET_SERVICE) private readonly fetchNftWalletClient: ClientKafka,
    @Inject(FETCH_APARTMENT_FOR_WALLET_SERVICE) private readonly fetchApartmentForWalletClient: ClientKafka,
  ) {}

  fetchNftForWalletRequest(dto: NftForWalletRequestDto) {
    this.fetchNftWalletClient.emit('nft.for.wallet.request', dto);
    this.fetchApartmentForWalletClient.emit('fetch.apartment.for.wallet.request', dto);
  }
}
