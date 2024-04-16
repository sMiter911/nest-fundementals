import { ApiProperty } from '@nestjs/swagger';
import { Song } from 'src/songs/entities/song.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  @ApiProperty({ example: 'string', description: 'User Name' })
  user: User;

  @ManyToMany(() => Song, (song) => song.artists)
  @ApiProperty({ example: 'string', description: 'Songs' })
  songs: Song[];
}
