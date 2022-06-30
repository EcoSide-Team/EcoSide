import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, Length } from 'class-validator';
import { randomBytes } from 'crypto';

const EXAMPLE_TOKEN = randomBytes(64).toString('base64');

export class ActivateAccountDto {
    @ApiProperty({
        example: EXAMPLE_TOKEN,
        description: 'base64',
    })
    @IsBase64()
    @Length(EXAMPLE_TOKEN.length, EXAMPLE_TOKEN.length)
    token: string;
}
