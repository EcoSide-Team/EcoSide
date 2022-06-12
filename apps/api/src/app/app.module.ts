import { Module } from '@nestjs/common';

import { AppService, AppController } from '.';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
