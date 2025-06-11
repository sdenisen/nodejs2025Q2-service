import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { getOrThrow } from '../common/get-or-throw';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.track.findMany();
  }

  getById(id: string) {
    return this.prisma.track.findUniqueOrThrow({ where: { id: id } });
  }

  async create({ name, artistId, albumId, duration }: CreateTrackDto) {
    const new_track = await this.prisma.track.create({
      data: { name, artistId, albumId, duration },
    });
    return new_track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.prisma.track.findUniqueOrThrow({ where: { id: id } });
    const updated_track = await this.prisma.track.update({
      where: { id: id },
      data: updateTrackDto,
    });
    return updated_track;
  }

  async delete(id: string) {
    await this.prisma.track.findUniqueOrThrow({ where: { id: id } });
    const fav = await this.prisma.favorites.findUnique({ where: { id: 0 } });
    if (fav) {
      const filtered = fav.tracks.filter((trackId) => trackId !== id);
      await this.prisma.favorites.update({
        where: { id: 0 },
        data: { tracks: { set: filtered } },
      });
    }

    await this.prisma.track.delete({ where: { id: id } });
  }
}
