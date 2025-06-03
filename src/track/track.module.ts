import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [DatabaseModule],
})
export class TrackModule {}
