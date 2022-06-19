import { Module } from '@nestjs/common';

import { ConfigModule } from '../config';
import { DatabaseModule } from '../database';
import { AppController, AppService } from '.';

@Module({
    imports: [ConfigModule, DatabaseModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
