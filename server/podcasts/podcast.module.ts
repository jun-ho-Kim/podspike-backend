import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Episode } from "./entity/episode.entity";
import { Podcast } from "./entity/podcast.entity";
import { PodcastResolver, ReviewResolver} from "./podcast.resolver";
import { PodcastService } from "./podcast.service";
import { Review } from "./entity/review.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Episode, Podcast, Review])],
    providers: [PodcastService,PodcastResolver, ReviewResolver],
    exports: [PodcastService],
})
export class PodcastModule {}