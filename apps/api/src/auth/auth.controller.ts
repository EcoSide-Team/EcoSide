import {
    Body,
    Controller,
    HttpCode,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBody,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { User } from '@ecoside/database';
import {
    ActivateAccountDto,
    LoginDto,
    RegisterDto,
    RequestPasswordResetDto,
    ResetPasswordDto,
} from '@ecoside/dto';
import { AuthService, CookieGuard, LoginGuard, Request, ReqUser } from '.';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('@me')
    @HttpCode(200)
    @UseGuards(CookieGuard)
    @ApiOkResponse({ type: User })
    me(@ReqUser() user: User) {
        return user;
    }

    @Post('login')
    @HttpCode(200)
    @UseGuards(LoginGuard)
    @ApiBody({ type: LoginDto })
    @ApiOkResponse({ description: 'Successfully logged in', type: User })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    login(@ReqUser() user: User) {
        return user;
    }

    @Post('register')
    @ApiCreatedResponse({ description: 'Account created', type: User })
    @ApiConflictResponse({
        description: 'Account with that email address already exists',
    })
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('logout')
    @HttpCode(200)
    @ApiOkResponse({ description: 'Successfully logged out' })
    logout(@Req() request: Request) {
        request.logout((err) => {
            throw err;
        });
    }

    @Post('activate')
    @HttpCode(200)
    @ApiOkResponse({ description: 'Account activated', type: User })
    @ApiNotFoundResponse({ description: 'Invalid token' })
    activate(@Body() dto: ActivateAccountDto) {
        return this.authService.activate(dto);
    }

    @Post('request-password-reset')
    @HttpCode(200)
    @ApiOkResponse({ description: 'Successfully requested password reset' })
    requestPasswordReset(@Body() dto: RequestPasswordResetDto) {
        return this.authService.requestPasswordReset(dto);
    }

    @Post('reset-password')
    @HttpCode(200)
    @ApiOkResponse({ description: 'Password changed', type: User })
    @ApiNotFoundResponse({ description: 'Invalid token' })
    resetPassword(@Body() dto: ResetPasswordDto) {
        return this.authService.resetPassword(dto);
    }
}
