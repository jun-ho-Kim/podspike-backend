import { Module } from "../../node_modules/@nestjs/common";
import { PodcastResolver } from "./podcast.resolver";
import { PodcastService } from "./podcast.service";

@Module({
    controllers: [],
    providers: [PodcastService,PodcastResolver],
})
export class PodcastModule {}