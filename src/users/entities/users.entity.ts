import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Playlist } from 'src/playlists/entities/playlists.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ example: 'string', description: 'First Name' })
  firstName: string;

  @Column()
  @ApiProperty({ example: 'string', description: 'Last Name' })
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

  @Column({ nullable: true, type: 'text' })
  @ApiProperty({
    example: 'string',
    description: 'Two Factor Authentication Secret',
  })
  twoFASecret: string;

  @Column({ nullable: true, type: 'boolean' })
  enable2FA: boolean;

  @Column()
  @ApiProperty({ example: 'string', description: 'API Key' })
  apiKey: string;

  @Column()
  @ApiProperty({ example: 'string', description: 'User Phone Number' })
  phone: string;
}
