import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

export const WALLET_SERVICE = 'WALLET_SERVICE';
export const MURMUR_SERVICE = 'MURMUR_SERVICE';

export const WALLET_REQUEST_TOPIC = process.env.WALLET_REQUEST_TOPIC || 'default';
export const NUM_PARTITIONS = parseInt(process.env.NUM_PARTITIONS) || 1;
export const REPLICATION_FACTOR = parseInt(process.env.REPLICATION_FACTOR) || 1;
export const FILTER_NFT_DATA_TOPIC = process.env.FILTER_NFT_DATA_TOPIC || 'filter.nft.data';
export const FETCH_NFT_DATA_TOPIC = process.env.FETCH_NFT_DATA_TOPIC || 'fetch.nft.data';

export enum PRIORITY_LEVEL {
  LOW_PRIORITY = 'low',
  HIGH_PRIORITY = 'high',
}
