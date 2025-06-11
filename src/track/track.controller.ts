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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id) {
    return this.trackService.getById(id);
  }

  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true }))
    createTrackDto: CreateTrackDto,
  ) {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id,
    @Body(new ValidationPipe({ whitelist: true }))
    updateTracltDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTracltDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id) {
    return this.trackService.delete(id);
  }
}
