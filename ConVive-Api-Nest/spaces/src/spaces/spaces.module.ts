import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from './entities/Space.model';
import { SpacesService } from './spaces.service';
import { SpacesController } from './spaces.controller';
import { ValidationSpaces } from 'src/utils/validationsSpaca';

@Module({
    imports: [TypeOrmModule.forFeature([Space])],
    controllers: [SpacesController],
    providers: [SpacesService, ValidationSpaces],
})
export class SpacesModule {}
