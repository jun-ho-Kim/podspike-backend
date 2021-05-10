import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Episode } from "./entity/episode.entity";
import { Podcast } from "./entity/podcast.entity";
import { PodcastResolver } from "./podcast.resolver";
import { PodcastService } from "./podcast.service";

@Module({
    imports: [TypeOrmModule.forFeature([Episode, Podcast])],
    providers: [PodcastService,PodcastResolver],
    exports: [PodcastService],
})
export class PodcastModule {}