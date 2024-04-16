import { ApiProperty } from '@nestjs/swagger';
import { Song } from 'src/songs/entities/song.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @ApiProperty({ example: 'string', description: 'Name of the playlist' })
  name: string;
  /**
   * Each Playlist will have multiple songs
   */
  @OneToMany(() => Song, (song) => song.playList)
  @ApiProperty({ example: [], description: 'Array of songs' })
  songs: Song[];
  /**
   * Many Playlist can belong to a single unique user
   */
  @ManyToOne(() => User, (user: User) => user.playLists)
  // @ApiProperty({ example: 'string', description: 'User Name' })
  user: User;
}
