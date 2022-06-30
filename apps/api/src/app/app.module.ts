import { Module } from '@nestjs/common';

import { ConfigModule } from '../config';
import { DatabaseModule } from '../database';
import { EmailModule } from '../email';
import { UserModule } from '../user';
import { AppController, AppService } from '.';

@Module({
    imports: [ConfigModule, DatabaseModule, EmailModule, UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
