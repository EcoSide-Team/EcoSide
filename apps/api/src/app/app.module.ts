import { Module } from '@nestjs/common';

import { ConfigModule } from '../config';
import { DatabaseModule } from '../database';
import { EmailModule } from '../email';
import { AppController, AppService } from '.';

@Module({
    imports: [ConfigModule, DatabaseModule, EmailModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
