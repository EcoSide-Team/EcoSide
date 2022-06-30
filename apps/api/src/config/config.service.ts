import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MailerOptions } from '@nestjs-modules/mailer';
import { RedisOptions } from 'ioredis';

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

    get REDIS_URL() {
        return this.env.get<string>('REDIS_URL');
    }

    redisOptions(): RedisOptions {
        return {
            tls: this.REDIS_URL.startsWith('rediss://')
                ? { requestCert: true, rejectUnauthorized: false }
                : undefined,
        };
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

    mailerOptions(): MailerOptions {
        return {
            transport: {
                host: this.env.get('SMTP_HOST'),
                port: this.env.get('SMTP_PORT'),
                secure: this.env.get('SMTP_SECURE') === 'true',
                auth: {
                    user: this.env.get('SMTP_USERNAME'),
                    pass: this.env.get('SMTP_PASSWORD'),
                },
                logger: true,
            },
            defaults: {
                from: this.env.get('EMAIL_FROM'),
            },
        };
    }
}
