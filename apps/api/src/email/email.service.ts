import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';

import { ConfigService } from '../config';

@Injectable()
export class EmailService {
    constructor(
        private config: ConfigService,
        private mailerService: MailerService,
    ) {}

    private sendMail(sendMailOptions: ISendMailOptions) {
        if (this.config.get('EMAIL_ENABLE') !== 'true') return;

        return this.mailerService.sendMail(sendMailOptions);
    }

    confirmAccount(username: string) {
        const url = `${this.config.CLIENT_URL}/activate/${randomBytes(
            64,
        ).toString('base64url')}`;

        return this.sendMail({
            to: username,
            subject: 'Welcome to EcoSide',
            template: 'confirm-account',
            context: {
                username,
                confirm_url: url,
            },
        });
    }
}
