import { ApiProperty } from '@nestjs/swagger';
import { Artist } from 'src/artists/entities/artist.entity';
import { Playlist } from 'src/playlists/entities/playlists.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Title of the Song
   * @example Song
   */
  @Column()
  @ApiProperty({
    example: 'string',
    description: 'Title of the song',
  })
  title: string;

  // @Column('varchar', { array: true })
  // @ApiProperty({ example: ['string'], description: 'Name of the artist' })
  // artists: string[];

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  @ApiProperty({ example: ['number'], description: 'Name of the artists' })
  artists: Artist[];

  @Column({ type: 'date' })
  @ApiProperty({ example: 'string', description: 'Release date' })
  releasedDate: Date;

  @Column({ type: 'time' })
  @ApiProperty({ example: 'string', description: 'Duration of the song' })
  duration: Date;

  @Column({ type: 'text' })
  @ApiProperty({
    example: 'string',
    description: 'Lyrics of the song',
  })
  lyrics: string;

  /**
   * Many songs can belong to the playlist for each unique user
   */
  @ManyToOne(() => Playlist, (playList) => playList.songs)
  playList: Playlist;
}
