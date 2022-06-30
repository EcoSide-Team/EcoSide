import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsDate,
    IsEmail,
    IsOptional,
    IsString,
    Length,
    MaxDate,
    MinDate,
    ValidateNested,
} from 'class-validator';

import { Match, Time } from '@ecoside/utils';

export class UpdateUserPasswordDto {
    @ApiProperty({ example: 'admin123' })
    @IsString()
    @Length(8)
    new_password: string;

    @ApiProperty({ example: 'admin123' })
    @IsString()
    @Match(UpdateUserPasswordDto, (s) => s.new_password)
    confirm_password: string;
}

export class UpdateUserDto {
    @ApiProperty({ example: 'admin123' })
    @IsString()
    @Length(8)
    current_password: string;

    @ApiPropertyOptional({ example: 'maciej.opalinski@coderscrew.pl' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ type: UpdateUserPasswordDto })
    @IsOptional()
    @ValidateNested()
    password: UpdateUserPasswordDto;

    @ApiPropertyOptional({ example: 'Maciej' })
    @IsOptional()
    @IsString()
    first_name?: string;

    @ApiPropertyOptional({ example: 'Opaliński' })
    @IsOptional()
    @IsString()
    last_name?: string;

    @ApiPropertyOptional({ example: '2005-05-17T00:00:00.000Z' })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    @MaxDate(new Date(Date.now() - 16 * Time.YEAR))
    @MinDate(new Date(Date.now() - 100 * Time.YEAR))
    birthdate?: Date;
}
