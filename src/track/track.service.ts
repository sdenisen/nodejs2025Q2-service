import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TrackService {
  constructor(private readonly dbService: DatabaseService) {}
  getAll() {
    return [...this.dbService.tracks.values()];
  }

  getById(id: string) {
    if (!this.dbService.tracks.has(id)) {
      throw new NotFoundException('Track not found');
    }
    return this.dbService.tracks.get(id);
  }

  create({ name, artistId, albumId, duration }: CreateTrackDto) {
    const newTrack = new Track(name, artistId, albumId, duration);
    this.dbService.tracks.set(newTrack.id, newTrack);

    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!this.dbService.tracks.has(id)) {
      throw new NotFoundException('Track not found');
    }

    const track = this.dbService.tracks.get(id);
    const updatedTrack = { ...track, ...updateTrackDto };
    this.dbService.tracks.set(id, updatedTrack);

    return updatedTrack;
  }

  delete(id: string) {
    if (!this.dbService.tracks.has(id)) {
      throw new NotFoundException('Track not found');
    }

    this.dbService.favs.deleteTrack(id);
    this.dbService.tracks.delete(id);
  }
}
