import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [DatabaseModule],
})
export class FavsModule {}
