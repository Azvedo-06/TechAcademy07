import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUserDto';

@Controller('users')
export class UsersController {
    constructor(private userservice: UsersService) {}

    @Get()
    findAllUsers() {
        return this.userservice.findAll();
    }

    @Post()
    createUser(@Body() dto: CreateUserDto) {
        return this.userservice.create(dto);
    }

    @Get('/:id')
    findOneUser(@Param('id') id: number) {
        return this.userservice.findById(id);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: number) {
        return this.userservice.delete(id);
    }

    @Put('/:id')
    updateUser(@Param('id') id: number, @Body() dto: CreateUserDto) {
        return this.userservice.update(id, dto);
    }
}
