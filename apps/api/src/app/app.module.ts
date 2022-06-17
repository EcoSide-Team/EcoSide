import { Module } from '@nestjs/common';

import { AppController, AppService } from '.';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
