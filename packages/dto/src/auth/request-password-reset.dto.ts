import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestPasswordResetDto {
    @ApiProperty({ example: 'maciej.opalinski@coderscrew.pl' })
    @IsEmail()
    email: string;
}
