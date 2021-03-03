import { Controller, Get, Post, Param, Patch, Delete, Body } from "../../node_modules/@nestjs/common";
import { PodcastService } from "./podcast.service";
import { Podcast } from "./entity/podcast.entity";
import { Episode } from "./episode/episode.entity";
import { Resolver, Query, Mutation, Args } from "../../node_modules/@nestjs/graphql";
import { CreateEpisodeOutput, CreateEpisodeInput } from "./dto/create-episode";
import { CreatePodcastInput, CreatePodcastOutput } from "./dto/create-podcast.dto";
import { updatePodcastOutput, updatePodcastInput } from "./dto/update-podcast";
import { CoreOutput } from "./common/output.dto";
import { UpdateEpisodeOutput, UpdateEpisodeInput } from "./dto/update-episode";

@Controller('podcasts')
@Resolver(of => Podcast)
export class PodcastController {
    constructor(
        private readonly podcastService: PodcastService
    ) {}
    @Get()
    @Query(returns => Podcast)
    getPodcast(): Podcast[] {
        return this.podcastService.getHome();
    };

    @Post()
    @Mutation(returns => CreatePodcastOutput)
    createChannel(@Args('input') @Body() podcastData: CreatePodcastInput
    ): CreatePodcastOutput {
        return this.podcastService.createChannel(podcastData);
    };

    @Get("/:id")
    @Query(returns => Podcast)
    getPodcastId(@Param("id") id:string) {
        return this.podcastService.getPodcastOne(id);
    };
    
    @Patch("/:id") 
    @Mutation(returns => updatePodcastOutput)
    patchPodcastId(@Args('input') @Param("id") id:string, @Body() podcastData: updatePodcastInput
    ): updatePodcastOutput { 
        return this.podcastService.updatePodcast(id, podcastData);
    };

    @Delete("/:id")
    @Mutation(returns => CoreOutput)
    deletePodcastId(@Args('input') @Param("id") id: string): CoreOutput {
        return this.podcastService.deletePodcast(id);
    };

    @Get("/:id/episode")
    @Query(returns => Episode)
    getEpisodeId(): Episode[] {
        return this.podcastService.getEpisode();
    };

    @Post("/:id/episode")
    @Mutation(returns => CreateEpisodeOutput)
    postEpisodeId(
        @Args('input') 
        @Body() episodeData: CreateEpisodeInput
    ): CreateEpisodeOutput {
        return this.podcastService.PostEpisode(episodeData);
    };

    @Patch("/:id/episode/:episodeId")
    @Mutation(returns => UpdateEpisodeOutput)
    patchEpisodeId(
        @Args('input') 
        @Param("episodeId") 
        id: string, 
        @Body() episodeData: UpdateEpisodeInput
    ): UpdateEpisodeOutput {
        return this.podcastService.updateEpisode(id, episodeData);
    };

    @Delete("/:id/episode/:episodeId")
    @Mutation(returns => CoreOutput)
    deleteEpisodeId(@Args('input')
    @Param("episodeId") id: string): CoreOutput {
        return this.podcastService.deleteEpisode(id);
    }
}