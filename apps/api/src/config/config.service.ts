import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Env, NodeEnv } from '.';

@Injectable()
export class ConfigService {
    constructor(private env: NestConfigService<Env, true>) {}

    get<T = any>(key: keyof Env) {
        return this.env.get<T>(key);
    }

    get NODE_ENV() {
        return this.env.get<NodeEnv>('NODE_ENV');
    }

    get PORT() {
        return this.env.get<number>('PORT');
    }

    get BASE_PATH() {
        return this.env.get<string>('BASE_PATH');
    }

    get CLIENT_URL() {
        return this.env.get<string>('CLIENT_URL');
    }

    get CLIENT_CORS_WILDCARD_URL() {
        return this.env.get<string>('CLIENT_CORS_WILDCARD_URL');
    }

    databaseCredentials(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            url: this.get<string>('DATABASE_URL'),
            ssl:
                this.get<string>('DATABASE_SSL') === 'true'
                    ? { requestCert: true, rejectUnauthorized: false }
                    : undefined,
        };
    }
}
