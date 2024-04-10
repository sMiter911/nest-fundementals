import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlayListDto } from './dto/create-playlist.dto';
import { Playlist } from './entities/playlists.entities';
import { ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('playlist')
@Controller('playlists')
export class PlaylistsController {
  constructor(private _playlistService: PlaylistsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a playlist' })
  @ApiBody({ description: 'The playlist to be created', type: Playlist })
  create(@Body() platlistDto: CreatePlayListDto): Promise<Playlist> {
    return this._playlistService.create(platlistDto);
  }
}
