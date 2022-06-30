import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from '../user';
import { TokenType } from '.';

@Entity('user_tokens')
export class Token {
    @PrimaryColumn()
    token: string;

    @Column('enum', { enum: TokenType })
    type: TokenType;

    @ManyToOne(() => User, (u) => u.tokens, { onDelete: 'CASCADE' })
    user: User;

    getURIEncodedToken() {
        return encodeURIComponent(this.token);
    }
}
