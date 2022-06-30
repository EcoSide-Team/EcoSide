import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsString, Length } from 'class-validator';
import { randomBytes } from 'crypto';

import { Match } from '@ecoside/utils';

const EXAMPLE_TOKEN = randomBytes(64).toString('base64');

export class ResetPasswordDto {
    @ApiProperty({
        example: EXAMPLE_TOKEN,
        description: 'base64',
    })
    @IsBase64()
    @Length(EXAMPLE_TOKEN.length, EXAMPLE_TOKEN.length)
    token: string;

    @ApiProperty({ example: 'admin123' })
    @IsString()
    @Length(8)
    new_password: string;

    @ApiProperty({ example: 'admin123' })
    @Match(ResetPasswordDto, (s) => s.new_password)
    confirm_password: string;
}
