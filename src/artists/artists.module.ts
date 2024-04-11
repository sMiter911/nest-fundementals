import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist';
import { ArtistsService } from './artists.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
