import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

export const WALLET_SERVICE = 'WALLET_SERVICE';
export const MURMUR_SERVICE = 'MURMUR_SERVICE';
export const ADMIN_SERVICE = 'ADMIN_SERVICE';

export const WALLET_REQUEST_TOPIC = process.env.WALLET_REQUEST_TOPIC || 'default';
export const NUM_PARTITIONS = parseInt(process.env.NUM_PARTITIONS) || 1;
export const REPLICATION_FACTOR = parseInt(process.env.REPLICATION_FACTOR) || 1;

export const LOW_PRIORITY = process.env.LOW_PRIORITY || 0;
export const HIGH_PRIORITY = process.env.HIGH_PRIORITY || 1;

export enum PRIORITY_LEVEL {
  LOW_PRIORITY = 0,
  HIGH_PRIORITY = 1,
}
