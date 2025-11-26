import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { CreateSpacesDto } from './dto/createSpacesDto';
import { updateSpaceDto } from './dto/updateSpaceDto';
import { Public } from 'src/guard/public.decorator';
@Controller('spaces')
export class SpacesController {
    constructor(
        private spaceService: SpacesService
    ) {}
    @Public()
    @Get()
    GetAllSpaces() {
        return this.spaceService.findAll();
    };
    
    @Public()
    @Get('/:id')
    GetSpaceById(@Param('id') id: number) {
        return this.spaceService.findById(id);
    }

    @Post()
    createSpace(@Body() dto: CreateSpacesDto) {
        return this.spaceService.create(dto);
    }

    @Delete('/:id')
    deleteSpace(@Param('id') id: number) {
        return this.spaceService.delete(id);
    }

    @Put('/:id')
    updateSpace(@Param('id') id: number, @Body() dto: updateSpaceDto) {
        return this.spaceService.update(id, dto)
    }
}
