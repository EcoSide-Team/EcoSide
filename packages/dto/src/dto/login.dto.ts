import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'maciej.opalinski' })
    @IsString()
    @Length(3, 64)
    username: string;

    @ApiProperty({ example: 'admin123' })
    @IsString()
    @Length(8)
    password: string;
}
