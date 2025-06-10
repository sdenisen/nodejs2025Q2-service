import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}
  @Get()
  getAll() {
    return this.favsService.getAll();
  }
  @Post('artist/:id')
  addArtist(@Param('id', ParseUUIDPipe) id) {
    return this.favsService.addArtist(id);
  }
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', ParseUUIDPipe) id) {
    return this.favsService.deleteArtist(id);
  }
  @Post('album/:id')
  addAlbum(@Param('id', ParseUUIDPipe) id) {
    return this.favsService.addAlbum(id);
  }
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id', ParseUUIDPipe) id) {
    return this.favsService.deleteAlbum(id);
  }
  @Post('track/:id')
  addTack(@Param('id', ParseUUIDPipe) id) {
    return this.favsService.addTrack(id);
  }
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', ParseUUIDPipe) id) {
    return this.favsService.deleteTrack(id);
  }
}
