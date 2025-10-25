import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userservice: UsersService) {}

    @Get()
    findAllUsers() {
        return this.userservice.findAll();
    }

    @Post()
    createUser(@Body() user: any) {
        return this.userservice.create(user.name, user.cpf, user.phone, user.email, user.password, user.isAdmin);
    }

    @Get('/:id')
    findOneUser(@Param('id') id: number) {
        return this.userservice.findById(id);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: number) {
        return this.userservice.delete(id);
    }
}
