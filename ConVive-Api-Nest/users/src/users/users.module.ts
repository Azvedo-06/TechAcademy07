import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ValidationsUsers } from 'src/utils/validationsUsers';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guard/jwt.strategy';

@Module({
    imports: [TypeOrmModule.forFeature([User]), PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
    }),
],
    controllers: [UsersController],
    providers: [UsersService, ValidationsUsers, JwtStrategy],
})
export class UsersModule {}
