import { Injectable } from '@nestjs/common';

import { LoginDto } from '@ecoside/dto';

@Injectable()
export class AppService {
    sayHello() {
        return 'Hello World!';
    }

    login(body: LoginDto) {
        console.log(body);
    }
}
