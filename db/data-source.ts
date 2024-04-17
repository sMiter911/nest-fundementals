import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Artist } from 'src/artists/entities/artist.entity';
import { Playlist } from 'src/playlists/entities/playlists.entity';
import { Song } from 'src/songs/entities/song.entity';
import { User } from 'src/users/entities/users.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

//LOAD Environment Variables
require('dotenv').config();

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: configService.get<string>('dbHost'),
      port: configService.get<number>('dbPort'),
      username: configService.get<string>('username'),
      database: configService.get<string>('dbName'),
      password: configService.get<string>('password'),
      entities: [User, Playlist, Artist, Song],
      synchronize: false,
      migrations: ['dist/db/migrations/*.js'],
    };
  },
};

// console.log(process.env.NODE_ENV);
// console.log(process.env.DB_HOST); // these variables are undefined
// console.log(process.env.PASSWORD);

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
