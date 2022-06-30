import { Module } from '@nestjs/common';
import Redis from 'ioredis';

import { ConfigModule, ConfigService } from '../config';
import { REDIS } from '.';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            inject: [ConfigService],
            provide: REDIS,
            useFactory: (config: ConfigService) =>
                new Redis(config.REDIS_URL, config.redisOptions()),
        },
    ],
    exports: [REDIS],
})
export class RedisModule {}
