import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class NftForWalletRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  userId: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @MinLength(2)
  chain: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  address: string;
}
