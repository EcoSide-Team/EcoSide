import { Type } from 'class-transformer';
import { IsBooleanString, IsEnum, IsNumber, IsString } from 'class-validator';

export enum NodeEnv {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test',
}

export class Env {
    @IsEnum(NodeEnv)
    NODE_ENV: NodeEnv;

    // APP

    @Type(() => Number)
    @IsNumber()
    PORT = 4000;

    @IsString()
    BASE_PATH = '/';

    // CORS

    @IsString()
    CLIENT_URL: string;

    @IsString()
    CLIENT_CORS_WILDCARD_URL: string;

    // REDIS

    @IsString()
    REDIS_URL: string;

    // POSTGRES

    @IsString()
    DATABASE_URL: string;

    @IsBooleanString()
    DATABASE_SSL: string;

    // SMTP

    @IsBooleanString()
    EMAIL_ENABLE: string;

    @IsString()
    SMTP_HOST: string;

    @Type(() => Number)
    @IsNumber()
    SMTP_PORT: number;

    @IsBooleanString()
    SMTP_SECURE: string;

    @IsString()
    SMTP_USERNAME: string;

    @IsString()
    SMTP_PASSWORD: string;

    @IsString()
    EMAIL_FROM: string;
}
