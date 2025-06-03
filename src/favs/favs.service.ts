import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { eFavs } from './entities/favs.entity';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavsService {
  constructor(private readonly dbService: DatabaseService) {}

  getAll() {
    const artists = this.dbService.favs.getArtists.map((artistId) => {
      return this.dbService.artists.get(artistId);
    });

    const albums = this.dbService.favs.getAlbums.map((albumId) => {
      return this.dbService.albums.get(albumId);
    });

    const tracks = this.dbService.favs.getTracks.map((trackId) => {
      return this.dbService.tracks.get(trackId);
    });

    return { artists, albums, tracks };
  }

  addArtist(id: string) {
    if (!this.dbService.artists.has(id)) {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }

    const artist = this.dbService.artists.get(id);
    this.dbService.favs.addArtist(id);

    return artist;
  }

  deleteArtist(id: string) {
    if (!this.dbService.favs.has(id, eFavs.artists)) {
      throw new NotFoundException('This track is not favorite');
    }

    this.dbService.favs.deleteArtist(id);
  }

  addAlbum(id: string) {
    if (!this.dbService.albums.has(id)) {
      throw new UnprocessableEntityException("Album doesn't exist");
    }

    const album = this.dbService.albums.get(id);
    this.dbService.favs.addAlbum(id);

    return album;
  }

  deleteAlbum(id: string) {
    if (!this.dbService.favs.has(id, eFavs.albums)) {
      throw new NotFoundException('This Album is not favorite');
    }

    this.dbService.favs.deleteAlbum(id);
  }

  addTrack(id: string) {
    if (!this.dbService.tracks.has(id)) {
      throw new UnprocessableEntityException("Track doesn't exist");
    }

    const track = this.dbService.tracks.get(id);
    this.dbService.favs.addTrack(id);

    return track;
  }

  deleteTrack(id: string) {
    if (!this.dbService.favs.has(id, eFavs.tracks)) {
      throw new NotFoundException('This track is not favorite');
    }

    this.dbService.favs.deleteTrack(id);
  }
}
