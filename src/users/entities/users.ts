import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Playlist } from 'src/playlists/entities/playlists.entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ example: 'string', description: 'First Name' })
  firstName: string;

  @Column()
  @ApiProperty({ example: 'string', description: 'Lase Name' })
  lastName: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'string', description: 'Email' })
  email: string;

  @Column()
  @Exclude()
  @ApiProperty({ example: 'string', description: 'Password' })
  password: string;

  /**
   * A user can create many playLists
   */
  @OneToMany(() => Playlist, (playList) => playList.user)
  @ApiProperty({ example: 'Playlist', description: 'PlayList' })
  playLists: Playlist[];
}
