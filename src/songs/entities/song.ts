import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Title of the Song
   * @example Kitty
   */
  @Column()
  @ApiProperty({
    example: 'string',
    description: 'Title of the song',
  })
  title: string;

  @Column('varchar', { array: true })
  @ApiProperty({ example: ['string'], description: 'Name of the artist' })
  artists: string[];

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
}
