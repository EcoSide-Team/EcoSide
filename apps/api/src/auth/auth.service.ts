import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcryptjs';
import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';

import { AccountStatus, Token, TokenType, User } from '@ecoside/database';
import {
    ActivateAccountDto,
    RegisterDto,
    RequestPasswordResetDto,
    ResetPasswordDto,
} from '@ecoside/dto';
import { EmailService } from '../email';
import { UserService } from '../user';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private users: Repository<User>,
        @InjectRepository(Token) private tokens: Repository<Token>,
        private userService: UserService,
        private emailService: EmailService,
    ) {}

    async login(email: string, password: string) {
        try {
            const user = await this.userService.findOne(email);

            if (user.isAccountActive() && user.verifyPassword(password)) {
                return user;
            } else {
                throw new UnauthorizedException();
            }
        } catch {
            throw new UnauthorizedException();
        }
    }

    async register(dto: RegisterDto) {
        const user = this.users.create(dto);
        user.password_hash = hashSync(dto.password);

        try {
            await this.users.save(user);
        } catch {
            throw new ConflictException(
                'Account with that email address already exists.',
            );
        }

        try {
            const verify_token = new Token();
            verify_token.token = this.generateRandomToken();
            verify_token.type = TokenType.VERIFY_EMAIL;
            verify_token.user = user;
            await this.tokens.save(verify_token);

            await this.emailService.confirmAccount(user, verify_token);

            return user;
        } catch {
            await this.users.remove(user);
            throw new InternalServerErrorException();
        }
    }

    async activate(dto: ActivateAccountDto) {
        try {
            const token = await this.tokens.findOneOrFail({
                where: { token: dto.token },
                relations: ['user'],
            });
            const { user } = token;

            user.account_status = AccountStatus.ACTIVE;

            await this.users.save(user);
            await this.tokens.remove(token);

            return user;
        } catch {
            throw new NotFoundException();
        }
    }

    async requestPasswordReset({ email }: RequestPasswordResetDto) {
        try {
            const user = await this.userService.findOne(email);

            const reset_token = new Token();
            reset_token.token = this.generateRandomToken();
            reset_token.type = TokenType.PASSWORD_RESET;
            reset_token.user = user;
            await this.tokens.save(reset_token);

            await this.emailService.resetPassword(user, reset_token);
        } catch {
            return;
        }
    }

    async resetPassword(dto: ResetPasswordDto) {
        try {
            const token = await this.tokens.findOneOrFail({
                where: { token: dto.token },
                relations: ['user'],
            });
            const { user } = token;

            user.password_hash = hashSync(dto.new_password);

            await this.users.save(user);
            await this.tokens.remove(token);

            return user;
        } catch {
            throw new NotFoundException();
        }
    }

    generateRandomToken() {
        return randomBytes(64).toString('base64');
    }
}
