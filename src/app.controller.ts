import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { WalletRequestDto } from './dto';

@ApiTags('fetch-wallet')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiCreatedResponse({ status: 201, description: 'Request successfully queued in Kafka' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('fetch-wallet')
  fetchWallet(@Body() dto: WalletRequestDto) {
    console.log('dto==>', dto);
    this.appService.fetchWallet(dto);
  }
}
