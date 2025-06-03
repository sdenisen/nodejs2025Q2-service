import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArtistService {
  constructor(private readonly dbService: DatabaseService) {}

  getAll() {
    return [...this.dbService.artists.values()];
  }

  getById(id: string) {
    if (!this.dbService.artists.has(id)) {
      throw new NotFoundException('Artist not found');
    }

    return this.dbService.artists.get(id);
  }

  create({ name, grammy }: CreateArtistDto) {
    const newArtist = new Artist(name, grammy);
    this.dbService.artists.set(newArtist.id, newArtist);

    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!this.dbService.artists.has(id)) {
      throw new NotFoundException('Artist not found');
    }

    const artist = this.dbService.artists.get(id);
    const updatedArtist = { ...artist, ...updateArtistDto };
    this.dbService.artists.set(id, updatedArtist);

    return updatedArtist;
  }

  delete(id: string) {
    if (!this.dbService.artists.has(id)) {
      throw new NotFoundException('Artist not found');
    }

    this.dbService.albums.forEach((value, key) => {
      if (value.artistId === id) {
        const album = this.dbService.albums.get(key);
        album.artistId = null;
      }
    });

    this.dbService.tracks.forEach((value, key) => {
      if (value.artistId === id) {
        const track = this.dbService.tracks.get(key);
        track.artistId = null;
      }
    });

    this.dbService.favs.deleteArtist(id);

    this.dbService.artists.delete(id);
  }
}
