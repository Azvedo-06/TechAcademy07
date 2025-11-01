import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ValidationsUsers } from 'src/utils/validationsUsers';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, ValidationsUsers],
})
export class UsersModule {}
