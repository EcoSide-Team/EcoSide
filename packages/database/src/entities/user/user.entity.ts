import { ApiProperty } from '@nestjs/swagger';
import { compareSync } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Token } from '../token';
import { AccountRole, AccountStatus } from '.';

@Entity('users')
export class User {
    @ApiProperty({ example: randomUUID() })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: 'maciej.opalinski@coderscrew.pl' })
    @Column({ unique: true })
    email: string;

    @ApiProperty({ example: 'maciej.opalinski' })
    @Column({ unique: true })
    username: string;

    @Exclude()
    @Column()
    password_hash: string;

    @ApiProperty({ example: 'Maciej' })
    @Column()
    first_name: string;

    @ApiProperty({ example: 'Opaliński' })
    @Column()
    last_name: string;

    @ApiProperty({ example: '2005-05-17T00:00:00.000Z' })
    @Column('date')
    birthdate: Date;

    @ApiProperty({ enum: AccountRole, example: AccountRole.USER })
    @Column('enum', { enum: AccountRole, default: AccountRole.USER })
    account_role: AccountRole;

    @ApiProperty({ enum: AccountStatus, example: AccountStatus.ACTIVE })
    @Column('enum', { enum: AccountStatus, default: AccountStatus.UNVERIFIED })
    account_status: AccountStatus;

    @Exclude()
    @OneToMany(() => Token, (t) => t.user, { cascade: true })
    tokens: Token[];

    isAdmin() {
        return this.account_role === AccountRole.ADMIN;
    }

    isAccountActive() {
        return this.account_status === AccountStatus.ACTIVE;
    }

    verifyPassword(password: string) {
        return compareSync(password, this.password_hash);
    }
}
