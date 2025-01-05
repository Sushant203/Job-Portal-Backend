import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDTO } from './DTO/users.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userServices: UserService) { }

    @Post('')
    create(@Body() createUserDTO: createUserDTO) {
        return this.userServices.create(createUserDTO);
    }

    @Get()
    findAll() {
        return this.userServices.findAll();
    }

    @Get('  :id')
    findOne(@Param('id') id: number) {
        return this.userServices.findOne(id);
    }

    //update a user by id
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateUserDTO: Partial<createUserDTO>,
    ) {
        return this.userServices.update(id, updateUserDTO);
    }

    //delete a user by id
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.userServices.delete(id);
    }
}
