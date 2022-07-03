import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'maciej.opalinski@coderscrew.pl' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'admin123' })
    @IsString()
    @Length(8)
    password: string;
}
