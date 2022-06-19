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

    @IsNumber()
    PORT: number;

    // CORS

    @IsString()
    CLIENT_URL: string;

    // POSTGRES

    @IsString()
    DATABASE_URL: string;

    @IsBooleanString()
    DATABASE_SSL: string;
}
