import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';
import { getOrThrow } from '../common/get-or-throw';
import { PrismaService } from '../prisma/prisma.service';
import { Logger } from '@nestjs/common';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggingService,
  ) {}

  getAll() {
    this.logger.log('App started');
    return this.prisma.artist.findMany();
  }

  getById(id: string) {
    return this.prisma.artist.findUniqueOrThrow({ where: { id: id } });
  }

  async create({ name, grammy }: CreateArtistDto) {
    const new_artist = await this.prisma.artist.create({
      data: { name, grammy },
    });
    return new_artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    await this.prisma.artist.findUniqueOrThrow({ where: { id: id } });
    const updated_artist = await this.prisma.artist.update({
      where: { id: id },
      data: updateArtistDto,
    });
    return updated_artist;
  }

  async delete(id: string) {
    await this.prisma.artist.findUniqueOrThrow({ where: { id: id } });
    const fav = await this.prisma.favorites.findUnique({ where: { id: 0 } });
    if (fav) {
      const filtered = fav.artists.filter((artistId) => artistId !== id);
      await this.prisma.favorites.update({
        where: { id: 0 },
        data: { artists: { set: filtered } },
      });
    }
    await this.prisma.track.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    await this.prisma.album.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    await this.prisma.artist.delete({ where: { id: id } });
  }
}
