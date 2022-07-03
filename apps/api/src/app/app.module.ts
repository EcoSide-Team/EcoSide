import { Inject, MiddlewareConsumer, Module } from '@nestjs/common';
import * as ConnectRedis from 'connect-redis';
import * as session from 'express-session';
import Redis from 'ioredis';
import * as passport from 'passport';

import { Time } from '@ecoside/utils';
import { AuthModule } from '../auth';
import { ConfigModule, ConfigService, NodeEnv } from '../config';
import { DatabaseModule } from '../database';
import { EmailModule } from '../email';
import { REDIS, RedisModule } from '../redis';
import { UserModule } from '../user';
import { AppController, AppService } from '.';

const RedisStore = ConnectRedis(session);

@Module({
    imports: [
        ConfigModule,
        RedisModule,
        DatabaseModule,
        EmailModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(
        @Inject(REDIS) private redis_client: Redis,
        private config: ConfigService,
    ) {}

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                session({
                    secret: this.config.COOKIE_SECRET,
                    resave: false,
                    saveUninitialized: false,
                    cookie: {
                        maxAge: 7 * Time.DAY,
                        httpOnly: true,
                        secure: 'auto',
                        sameSite:
                            this.config.NODE_ENV === NodeEnv.DEVELOPMENT
                                ? undefined
                                : 'none',
                    },
                    store: new RedisStore({ client: this.redis_client }),
                }),
                passport.initialize(),
                passport.session(),
            )
            .forRoutes('*');
    }
}
