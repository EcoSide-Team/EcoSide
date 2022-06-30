import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Request } from '..';

export const ReqUser = createParamDecorator((_, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();

    return req.user;
});
