import { Controller, Get } from '@nestjs/common';

import { AppService } from '.';

@Controller()
export class AppController {
    constructor(private appService: AppService) {}

    @Get()
    sayHello() {
        return this.appService.sayHello();
    }
}
