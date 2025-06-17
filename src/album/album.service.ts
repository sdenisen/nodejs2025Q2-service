import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggingService,
  ) {}

  getAll() {
    return this.prisma.album.findMany();
  }

  getById(id: string) {
    return this.prisma.album.findUniqueOrThrow({ where: { id: id } });
  }

  async create({ name, year, artistId }: CreateAlbumDto) {
    const newAlbum = await this.prisma.album.create({
      data: { name, year, artistId },
    });
    return newAlbum;
  }

  async update(id: string, updateArtistDto: UpdateAlbumDto) {
    await this.prisma.album.findUniqueOrThrow({ where: { id: id } });
    const updated_album = await this.prisma.album.update({
      where: { id: id },
      data: updateArtistDto,
    });
    return updated_album;
  }

  async delete(id: string) {
    await this.prisma.album.findUniqueOrThrow({ where: { id: id } });
    const fav = await this.prisma.favorites.findUnique({ where: { id: 0 } });
    if (fav) {
      const filtered = fav.albums.filter((albumId) => albumId !== id);
      await this.prisma.favorites.update({
        where: { id: 0 },
        data: { albums: { set: filtered } },
      });
    }
    await this.prisma.track.updateMany({
      where: { albumId: id },
      data: { albumId: null },
    });

    await this.prisma.album.delete({ where: { id: id } });
  }
}
