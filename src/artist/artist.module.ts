import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [DatabaseModule],
})
export class ArtistModule {}
