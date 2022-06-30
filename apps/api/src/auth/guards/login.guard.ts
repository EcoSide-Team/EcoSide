import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Request } from '..';

@Injectable()
export class LoginGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext) {
        await super.canActivate(context);

        const req = context.switchToHttp().getRequest<Request>();
        await super.logIn(req);

        return true;
    }
}
