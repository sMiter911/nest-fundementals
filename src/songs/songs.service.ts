import { Injectable, Scope } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { Song } from './entities/song';
import { CreateSongDto } from './dto/create-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDto } from './dto/update-song.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/entities/artist';

@Injectable({ scope: Scope.TRANSIENT })
export class SongsService {
  // local db
  // local array
  private readonly songs = [];

  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(_songDTO: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = _songDTO.title;
    song.artists = _songDTO.artists;
    song.releasedDate = _songDTO.releasedDate;
    song.duration = _songDTO.duration;
    song.lyrics = _songDTO.lyrics;

    console.log(_songDTO.artists);

    const artists = await this.artistRepository.findByIds(_songDTO.artists);
    console.log(artists);

    song.artists = artists;

    return await this.songRepository.save(song);
  }
  findAll() {
    // fetch songs from the DB
    return this.songRepository.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.songRepository.delete(id);
  }

  update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
    return this.songRepository.update(id, recordToUpdate);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');
    return paginate<Song>(queryBuilder, options);
  }
}
