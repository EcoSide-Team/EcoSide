import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    MaxDate,
    MinDate,
} from 'class-validator';

import { Match, Time } from '@ecoside/utils';

export class RegisterDto {
    @ApiProperty({ example: 'maciej.opalinski@coderscrew.pl' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'maciej.opalinski' })
    @IsString()
    @Length(5, 64)
    username: string;

    @ApiProperty({ example: 'admin123' })
    @IsString()
    @Length(8)
    password: string;

    @ApiProperty({ example: 'admin123' })
    @IsString()
    @Match(RegisterDto, (s) => s.password)
    confirm_password: string;

    @ApiProperty({ example: 'Maciej' })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ example: 'Opaliński' })
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({ example: '2005-05-17T20:00:00.000Z' })
    @Type(() => Date)
    @IsDate()
    @MaxDate(new Date(Date.now() - 16 * Time.YEAR))
    @MinDate(new Date(Date.now() - 100 * Time.YEAR))
    birthdate: Date;
}
