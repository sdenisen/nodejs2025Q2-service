import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { eFavs } from './entities/favs.entity';
import { DatabaseService } from 'src/database/database.service';
import { getOrThrow } from '../common/get-or-throw';
import { favsEnsureHas } from '../common/favs-ensure-has';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const fav = await this.prisma.favorites.findUnique({ where: { id: 0 } });
    if (fav) {
      const artists = await this.prisma.artist.findMany();
      const favorite_artists = artists.filter((artist) =>
        fav.artists.includes(artist.id),
      );

      const albums = await this.prisma.album.findMany();
      const favorite_albums = albums.filter((album) =>
        fav.albums.includes(album.id),
      );

      const tracks = await this.prisma.track.findMany();
      const favorite_tracks = tracks.filter((track) =>
        fav.tracks.includes(track.id),
      );
      return { artists: favorite_artists, albums: favorite_albums, tracks: favorite_tracks };
    } else {
      await this.prisma.favorites.create({
        data: { id: 0, artists: [], albums: [], tracks: [] },
      });
    }
    return { artists: [], albums: [], tracks: [] };
  }

  async addArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: id },
    });
    if (artist === null) {
      throw new UnprocessableEntityException('User not found');
    }

    const fav = await this.prisma.favorites.findUnique({ where: { id: 0 } });
    if (!fav) {
      await this.prisma.favorites.create({
        data: { id: 0, artists: [], albums: [], tracks: [] },
      });
    }
    fav.artists.push(id);
    await this.prisma.favorites.update({
      where: { id: 0 },
      data: { artists: { set: fav.artists } },
    });
    return artist;
  }

  async deleteArtist(id: string) {
    const artist = await this.prisma.artist.findUniqueOrThrow({
      where: { id: id },
    });
    const fav = await this.prisma.favorites.findUnique({ where: { id: 0 } });
    console.log(fav);
    if (fav) {
      const filtered = fav.artists.filter((artistId) => artistId !== artist.id);
      await this.prisma.favorites.update({
        where: { id: 0 },
        data: { artists: { set: filtered } },
      });
    }
  }

  async addAlbum(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id: id },
    });
    if (album === null) {
      throw new UnprocessableEntityException('User not found');
    }
    let fav = await this.prisma.favorites.findUnique({ where: { id: 0 } });
    if (!fav) {
      await this.prisma.favorites.create({
        data: { id: 0, artists: [], albums: [], tracks: [] },
      });
      fav = await this.prisma.favorites.findUnique({ where: { id: 0 } });
    }

    fav.albums.push(id);
    console.log(fav);
    await this.prisma.favorites.update({
      where: { id: 0 },
      data: { albums: { set: fav.albums } },
    });
    return album;
  }

  async deleteAlbum(id: string) {
    const album = await this.prisma.album.findUniqueOrThrow({
      where: { id: id },
    });
    const fav = await this.prisma.favorites.findUnique({ where: { id: 0 } });
    if (fav) {
      const filtered = fav.albums.filter((albumId) => albumId !== album.id);
      await this.prisma.favorites.update({
        where: { id: 0 },
        data: { albums: { set: filtered } },
      });
    }
  }

  async addTrack(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id: id },
    });

    if (track === null) {
      throw new UnprocessableEntityException('User not found');
    }

    let fav = await this.prisma.favorites.findUnique({ where: { id: 0 } });
    if (!fav) {
      await this.prisma.favorites.create({
        data: { id: 0, artists: [], albums: [], tracks: [] },
      });
      fav = await this.prisma.favorites.findUnique({ where: { id: 0 } });
    }

    fav.tracks.push(id);
    await this.prisma.favorites.update({
      where: { id: 0 },
      data: { tracks: { set: fav.tracks } },
    });

    return track;
  }

  async deleteTrack(id: string) {
    const track = await this.prisma.track.findUniqueOrThrow({
      where: { id: id },
    });
    const fav = await this.prisma.favorites.findUnique({ where: { id: 0 } });
    if (fav) {
      const filtered = fav.tracks.filter((trackId) => trackId !== track.id);
      await this.prisma.favorites.update({
        where: { id: 0 },
        data: { tracks: { set: filtered } },
      });
    }
  }
}
