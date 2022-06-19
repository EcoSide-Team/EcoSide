import { Module } from '@nestjs/common';

import { ConfigModule } from '../config';
import { AppController, AppService } from '.';

@Module({
    imports: [ConfigModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
