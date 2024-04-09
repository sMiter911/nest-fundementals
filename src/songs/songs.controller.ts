import {
  Controller,
  Delete,
  Post,
  Get,
  Put,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Body,
  Scope,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { Song } from './entities/song';
import { UpdateSongDto } from './dto/update-song.dto';
import { UpdateResult } from 'typeorm';

@Controller({
  path: 'songs',
  scope: Scope.REQUEST,
})
export class SongsController {
  constructor(private _songService: SongsService) {}

  @Post()
  create(@Body() _createSongDTO: CreateSongDto): Promise<Song> {
    return this._songService.create(_createSongDTO);
  }

  @Get()
  findAll(): Promise<Song[]> {
    return this._songService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    @Param('id')
    id: number,
  ): Promise<Song> {
    return this._songService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDTO: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this._songService.update(id, updateSongDTO);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._songService.remove(id);
  }
}
