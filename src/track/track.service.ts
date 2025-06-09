import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { getOrThrow } from '../common/get-or-throw';

@Injectable()
export class TrackService {
  constructor(private readonly dbService: DatabaseService) {}
  getAll() {
    return [...this.dbService.tracks.values()];
  }

  getById(id: string) {
    return getOrThrow(this.dbService.tracks, id, 'Track not found');
  }

  create({ name, artistId, albumId, duration }: CreateTrackDto) {
    const newTrack = new Track(name, artistId, albumId, duration);
    this.dbService.tracks.set(newTrack.id, newTrack);

    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = getOrThrow(this.dbService.tracks, id, 'Track not found');
    const updatedTrack = { ...track, ...updateTrackDto };
    this.dbService.tracks.set(id, updatedTrack);

    return updatedTrack;
  }

  delete(id: string) {
    getOrThrow(this.dbService.tracks, id, 'Track not found');
    this.dbService.favs.deleteTrack(id);
    this.dbService.tracks.delete(id);
  }
}
