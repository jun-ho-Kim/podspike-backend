import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreEntity } from './podcasts/common/entities/coreEntity';
import { Episode } from './podcasts/entity/episode.entity';
import { Podcast } from './podcasts/entity/podcast.entity';
import { PodcastModule } from './podcasts/podcast.module';

@Module({
  imports: [
    PodcastModule, 
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      logging: true,
      synchronize: true,
      entities: [Podcast, Episode, CoreEntity]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
