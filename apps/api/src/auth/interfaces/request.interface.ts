import { Request as ExpressRequest } from 'express';

import { User } from '@ecoside/database';

export interface Request extends ExpressRequest {
    user: User;
}
