import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, hashSync } from 'bcryptjs';
import { Repository } from 'typeorm';

import { User } from '@ecoside/database';
import { UpdateUserDto } from '@ecoside/dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private users: Repository<User>) {}

    async getByID(id: string) {
        const user = await this.users.findOne({ where: { id } });

        if (!user) throw new NotFoundException();

        return user;
    }

    async findOne(email: string) {
        const user = await this.users.findOne({
            where: [{ email }],
        });

        if (!user) throw new NotFoundException();

        return user;
    }

    updateUser(user: User, dto: UpdateUserDto) {
        if (compareSync(dto.current_password, user.password_hash)) {
            if (dto.password) {
                user.password_hash = hashSync(dto.password.new_password);
            }

            return this.users.save({
                ...user,
                ...dto,
            });
        } else throw new UnauthorizedException();
    }
}
