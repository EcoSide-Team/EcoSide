import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @ApiProperty({ example: randomUUID() })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: 'maciej.opalinski' })
    @Column()
    username: string;

    @ApiProperty({ example: 16 })
    @Column('int')
    age: number;
}
