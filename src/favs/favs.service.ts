import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { eFavs } from './entities/favs.entity';
import { DatabaseService } from 'src/database/database.service';
import { getOrThrow } from '../common/get-or-throw';
import { favsEnsureHas } from '../common/favs-ensure-has';

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
    const artist = getOrThrow(
      this.dbService.artists,
      id,
      "Artist doesn't exist",
    );
    this.dbService.favs.addArtist(id);

    return artist;
  }

  deleteArtist(id: string) {
    favsEnsureHas(
      this.dbService.favs,
      id,
      eFavs.artists,
      'This artist is not favorite',
    );

    this.dbService.favs.deleteArtist(id);
  }

  addAlbum(id: string) {
    const album = getOrThrow(
      this.dbService.artists,
      id,
      "Artist doesn't exist",
    );
    this.dbService.favs.addAlbum(id);

    return album;
  }

  deleteAlbum(id: string) {
    favsEnsureHas(
      this.dbService.favs,
      id,
      eFavs.albums,
      'This Album is not favorite',
    );

    this.dbService.favs.deleteAlbum(id);
  }

  addTrack(id: string) {
    const track = getOrThrow(this.dbService.tracks, id, "Track doesn't exist");
    this.dbService.favs.addTrack(id);

    return track;
  }

  deleteTrack(id: string) {
    favsEnsureHas(
      this.dbService.favs,
      id,
      eFavs.tracks,
      'This track is not favorite',
    );

    this.dbService.favs.deleteTrack(id);
  }
}
