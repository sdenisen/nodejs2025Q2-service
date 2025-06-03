import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favs } from 'src/favs/entities/favs.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DatabaseService {
  public readonly users = new Map<string, User>();
  public readonly artists = new Map<string, Artist>();
  public readonly albums = new Map<string, Album>();
  public readonly tracks = new Map<string, Track>();
  public readonly favs = new Favs();
}
