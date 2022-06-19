import { Body, Controller, Get, Post } from '@nestjs/common';

import { LoginDto } from '@ecoside/dto';
import { AppService } from '.';

@Controller()
export class AppController {
    constructor(private appService: AppService) {}

    @Get()
    sayHello() {
        return this.appService.sayHello();
    }

    @Post()
    login(@Body() body: LoginDto) {
        return this.appService.login(body);
    }
}
