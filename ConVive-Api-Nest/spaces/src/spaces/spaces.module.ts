import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from './entities/Space.model';
import { SpacesService } from './spaces.service';
import { SpacesController } from './spaces.controller';
import { ValidationSpaces } from 'src/utils/validationsSpaca';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/guard/jwt.strategy';

@Module({
    imports: [TypeOrmModule.forFeature([Space]), PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        })
    ],
    controllers: [SpacesController],
    providers: [SpacesService, ValidationSpaces, JwtStrategy],
})
export class SpacesModule {}
