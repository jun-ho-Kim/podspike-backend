import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PodcastModule } from './podcasts/podcast.module';

@Module({
  imports: [PodcastModule, GraphQLModule.forRoot({ autoSchemaFile: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
