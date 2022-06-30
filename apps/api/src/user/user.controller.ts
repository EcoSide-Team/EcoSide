import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

import { UpdateUserDto } from '@ecoside/dto';
import { UserService } from '.';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get(':id')
    @ApiParam({ name: 'id', example: randomUUID() })
    async getUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.userService.getByID(id);
    }

    @Patch(':id')
    @ApiParam({ name: 'id', example: randomUUID() })
    async updateUser(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateUserDto,
    ) {
        const user = await this.userService.getByID(id);

        return await this.userService.updateUser(user, dto);
    }
}
