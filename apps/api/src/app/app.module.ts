import { Module } from '@nestjs/common';

import { AuthModule } from '../auth';
import { ConfigModule } from '../config';
import { DatabaseModule } from '../database';
import { EmailModule } from '../email';
import { UserModule } from '../user';
import { AppController, AppService } from '.';

@Module({
    imports: [
        ConfigModule,
        DatabaseModule,
        EmailModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
