import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SpacesService } from './spaces.service';
import { CreateSpacesDto } from './dto/createSpacesDto';
import { updateSpaceDto } from './dto/updateSpaceDto';
import { Public } from 'src/guard/public.decorator';
@Controller('spaces')
export class SpacesController {
  constructor(private spaceService: SpacesService) {}
  @Public()
  @Get()
  GetAllSpaces() {
    return this.spaceService.findAll();
  }

  @Public()
  @Get('/:id')
  GetSpaceById(@Param('id') id: number) {
    return this.spaceService.findById(id);
  }

  @Public()
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/spaces',
        filename: (req, file, callback) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  createSpace(
    @Body() dto: CreateSpacesDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      dto.imageUrl = `/uploads/spaces/${file.filename}`;
    }
    console.log('FILE => ', file);
    console.log('BODY => ', dto);
    return this.spaceService.create(dto);
  }

  @Delete('/:id')
  deleteSpace(@Param('id') id: number) {
    return this.spaceService.delete(id);
  }

  @Put('/:id')
  updateSpace(@Param('id') id: number, @Body() dto: updateSpaceDto) {
    return this.spaceService.update(id, dto);
  }
}
