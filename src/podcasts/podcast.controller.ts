import { Controller, Get, Post, Param, Patch, Delete, Body } from "../../node_modules/@nestjs/common";
import { PodcastService } from "./podcast.service";
import { Podcast } from "./entity/podcast.entity";
import { Episode } from "./episode/episode.entity";

@Controller('podcasts')
export class PodcastController {
    constructor(
        private readonly podcastService: PodcastService
    ) {}
    @Get()
    getPodcast(): Podcast[] {
        return this.podcastService.getHome();
    };

    @Post()
    create(@Body() podcastData: Podcast) {
        console.log("podcastData", podcastData);
        return this.podcastService.createChannel(podcastData);
    };

    @Get("/:id")
    getPodcastId(@Param("id") id:string) {
        return this.podcastService.getPodcastOne(id);
    };
    
    @Patch("/:id") 
    patchPodcastId(@Param("id") id:string, @Body() podcastData: Podcast) {
        return this.podcastService.updatePodcast(id, podcastData);
    };

    @Delete("/:id")
    deletePodcastId(@Param("id") id: string) {
        return this.podcastService.deletePodcast(id);
    };

    @Get("/:id/episode")
    getEpisodeId(): Episode[] {
        return this.podcastService.getEpisode();
    };

    @Post("/:id/episode")
    postEpisodeId(@Body() episodeData: Episode) {
        return this.podcastService.PostEpisode(episodeData);
    };

    @Patch("/:id/episode/:episodeId")
    patchEpisodeId(@Param("episodeId") id: string, @Body() episodeData: Episode) {
        return this.podcastService.updateEpisode(id, episodeData);
    };

    @Delete("/:id/episode/:episodeId")
    deleteEpisodeId(@Param("episodeId") id: string) {
        return this.deleteEpisodeId(id);
    }
}