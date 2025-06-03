import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AlbumService {
  constructor(private readonly dbService: DatabaseService) {}
  getAll() {
    return [...this.dbService.albums.values()];
  }

  getById(id: string) {
    if (!this.dbService.albums.has(id)) {
      throw new NotFoundException('Album not found');
    }

    return this.dbService.albums.get(id);
  }

  create({ name, year, artistId }: CreateAlbumDto) {
    const newAlbum = new Album(name, year, artistId);
    this.dbService.albums.set(newAlbum.id, newAlbum);

    return newAlbum;
  }

  update(id: string, updateArtistDto: UpdateAlbumDto) {
    if (!this.dbService.albums.has(id)) {
      throw new NotFoundException('Album not found');
    }

    const album = this.dbService.albums.get(id);
    const updatedAlbum = { ...album, ...updateArtistDto };
    this.dbService.albums.set(id, updatedAlbum);

    return updatedAlbum;
  }

  delete(id: string) {
    if (!this.dbService.albums.has(id)) {
      throw new NotFoundException('Album not found');
    }

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
