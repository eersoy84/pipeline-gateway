import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { NftForWalletRequestDto } from './dto';

@ApiTags('fetch-nft-for-wallet')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @ApiResponse({ status: 201, description: 'Request successfully queued in Kafka' })
  @ApiCreatedResponse()
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('fetch-nft-for-wallet')
  fetchNftForWalletRequest(@Body() dto: NftForWalletRequestDto) {
    this.appService.fetchNftForWalletRequest(dto);
  }
}
