import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class WalletRequestDto {
  @ApiProperty({
    type: String,
    description: 'User Id',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  userId: string;

  @ApiProperty({
    type: String,
    description: 'chain',
    default: 'eth',
  })
  @IsNotEmpty()
  @MinLength(2)
  chain: string;

  @ApiProperty({
    type: String,
    description: 'crypto token address',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  address: string;
}
