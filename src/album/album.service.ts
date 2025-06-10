import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';
import { getOrThrow } from '../common/get-or-throw';

@Injectable()
export class AlbumService {
  constructor(private readonly dbService: DatabaseService) {}

  getAll() {
    return [...this.dbService.albums.values()];
  }

  getById(id: string) {
    return getOrThrow(this.dbService.albums, id, 'Album not found');
  }

  create({ name, year, artistId }: CreateAlbumDto) {
    const newAlbum = new Album(name, year, artistId);
    this.dbService.albums.set(newAlbum.id, newAlbum);

    return newAlbum;
  }

  update(id: string, updateArtistDto: UpdateAlbumDto) {
    const album = getOrThrow(this.dbService.albums, id, 'Album not found');
    const updatedAlbum = { ...album, ...updateArtistDto };
    this.dbService.albums.set(id, updatedAlbum);

    return updatedAlbum;
  }

  delete(id: string) {
    getOrThrow(this.dbService.albums, id, 'Album not found');

    this.dbService.tracks.forEach((value, key) => {
      if (value.albumId === id) {
        const track = this.dbService.tracks.get(key);
        track.albumId = null;
      }
    });

    this.dbService.favs.deleteAlbum(id);

    this.dbService.albums.delete(id);
  }
}
