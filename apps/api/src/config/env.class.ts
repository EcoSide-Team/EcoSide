import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';

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

    // CORS

    @IsString()
    CLIENT_URL: string;
}
