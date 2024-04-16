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
  DefaultValuePipe,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { Song } from './entities/song.entity';
import { UpdateSongDto } from './dto/update-song.dto';
import { UpdateResult } from 'typeorm';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtArtistAuthGuard } from 'src/auth/jwt/jwt-artist.guard';

@ApiTags('songs')
@Controller({
  path: 'songs',
  scope: Scope.REQUEST,
})
export class SongsController {
  constructor(private _songService: SongsService) {}

  @Post()
  @UseGuards(JwtArtistAuthGuard)
  @ApiOperation({ summary: 'Create a song' })
  @ApiBody({ description: 'The song to be created', type: Song })
  create(@Body() _createSongDTO: CreateSongDto, @Req() req): Promise<Song> {
    console.log(req.user);
    return this._songService.create(_createSongDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of songs' })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: Song,
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
  ): Promise<Pagination<Song>> {
    // fetch songs from the DB
    limit = limit > 100 ? 100 : limit;
    return this._songService.paginate({ page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single song' })
  @ApiResponse({
    status: 200,
    description: 'Find a record',
    type: Song,
  })
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
  @ApiOperation({ summary: 'Update song' })
  @ApiBody({ description: 'The song to be updated', type: Song })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDTO: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this._songService.update(id, updateSongDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete song' })
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._songService.remove(id);
  }
}
