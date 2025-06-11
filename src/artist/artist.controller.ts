import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAll() {
    return this.artistService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id) {
    return this.artistService.getById(id);
  }

  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true }))
    createArtirstDto: CreateArtistDto,
  ) {
    return this.artistService.create(createArtirstDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id,
    @Body(new ValidationPipe({ whitelist: true }))
    updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id) {
    return this.artistService.delete(id);
  }
}
