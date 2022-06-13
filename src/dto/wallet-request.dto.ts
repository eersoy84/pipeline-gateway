import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { PRIORITY_LEVEL } from 'src/app.constants';

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

  @ApiProperty({
    type: String,
    description: 'priority level',
    default: 'high priority',
    enum: [PRIORITY_LEVEL.LOW_PRIORITY, PRIORITY_LEVEL.HIGH_PRIORITY],
  })
  @IsOptional()
  @IsEnum(PRIORITY_LEVEL)
  priority: PRIORITY_LEVEL;
}
