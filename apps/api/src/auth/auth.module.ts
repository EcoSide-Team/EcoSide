import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Token, User } from '@ecoside/database';
import { EmailModule } from '../email';
import { UserModule } from '../user';
import { AuthController, AuthService, LocalSerializer, LocalStrategy } from '.';

@Module({
    imports: [
        UserModule,
        PassportModule,
        TypeOrmModule.forFeature([User, Token]),
        EmailModule,
    ],
    providers: [AuthService, LocalStrategy, LocalSerializer],
    controllers: [AuthController],
})
export class AuthModule {}
