import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class NftForWalletRequestDto {
  @ApiProperty({
    type: String,
    description: 'User Id',
    default: '',
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
  @IsEmail()
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
