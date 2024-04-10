import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerModule } from './common/middleware/logger/logger.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/entities/song';
import { Artist } from './artists/entities/artist';
import { User } from './users/entities/users';
import { PlaylistsModule } from './playlists/playlists.module';
import { Playlist } from './playlists/entities/playlists.entities';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

const devConfig = {
  port: 3000,
};

const proConfig = {
  port: 400,
};

@Module({
  imports: [
    SongsModule,
    LoggerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'Solidus_snake1987',
      database: 'n-test',
      entities: [Song, Artist, User, Playlist],
      synchronize: true,
    }),
    PlaylistsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log(dataSource.driver.database);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
