import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { ConfigService, Env } from '.';

@Module({
    imports: [
        NestConfigModule.forRoot({
            validate: (config) => {
                const validatedConfig = plainToClass(Env, config, {
                    enableImplicitConversion: true,
                });

                const errors = validateSync(validatedConfig, {
                    skipMissingProperties: false,
                });

                if (errors.length > 0) {
                    throw new Error(errors.toString());
                }

                return validatedConfig;
            },
            expandVariables: true,
        }),
    ],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class ConfigModule {}
