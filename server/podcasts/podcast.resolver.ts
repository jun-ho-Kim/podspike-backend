import { Get, Post, Param, Patch, Delete, Body } from "@nestjs/common";
import { PodcastService } from "./podcast.service";
import { Podcast } from "./entity/podcast.entity";
import { Episode } from "./entity/episode.entity";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateEpisodeOutput, CreateEpisodeInput } from "./dto/create-episode";
import { CreatePodcastInput, CreatePodcastOutput } from "./dto/create-podcast.dto";
import { UpdatePodcastOutput, UpdatePodcastInput } from "./dto/update-podcast";
import { CoreOutput } from "./common/output.dto";
import { UpdateEpisodeOutput, UpdateEpisodeInput } from "./dto/update-episode";
import { GetPodcastInput, GetPodcastOutput } from "./dto/get-podcast";
import { DeleteInput, DeleteOutput, EpisodeSearchInput } from "./dto/delete.dto";
import { GetEpisodeInput, GetEpisodeOutput } from "./dto/get-episode";

@Resolver(of => Podcast)
export class PodcastController {
    constructor(
        private readonly podcastService: PodcastService
    ) {}

    @Query(returns => Podcast)
    getPodcast(): Podcast[] {
        return this.podcastService.getHome();
    };

    @Mutation(returns => CreatePodcastOutput)
    createChannel(@Args('input') createPodcastInput: CreatePodcastInput
    ): CreatePodcastOutput {
        return this.podcastService.createPodcast(createPodcastInput);
    };

    
    @Query(returns => GetPodcastOutput)
    getPodcastId(@Args('input') getPodcastInput: GetPodcastInput) {
        return this.podcastService.getPodcastOne(getPodcastInput.id);
    };
    
    @Mutation(returns => UpdatePodcastOutput)
    updatePodcast(@Args('input') updatePodcastInput: UpdatePodcastInput
    ): UpdatePodcastOutput { 
        return this.podcastService.updatePodcast(updatePodcastInput);
    };


    @Mutation(returns => CoreOutput)
    deletePodcastId(@Args('input') {id}: DeleteInput): DeleteOutput {
        return this.podcastService.deletePodcast(id);
    };

    @Query(returns => Episode)
    getEpisodeId(getEpisodeInput: GetEpisodeInput): GetEpisodeOutput {
        return this.podcastService.getEpisode(getEpisodeInput);
    };

    @Mutation(returns => CreateEpisodeOutput)
    createEpisode(
        @Args('input') createEpisodeInput: CreateEpisodeInput
    ): CreateEpisodeOutput {
        return this.podcastService.CreateEpisode(createEpisodeInput);
    };

    @Mutation(returns => UpdateEpisodeOutput)
    updateEpisode(
        @Args('input') updateEpisodeInput: UpdateEpisodeInput
    ): UpdateEpisodeOutput {
        return this.podcastService.updateEpisode(updateEpisodeInput);
    };

    @Mutation(returns => CoreOutput)
    deleteEpisode(@Args('input') episodeSearchInput: EpisodeSearchInput
   ): DeleteOutput {
        return this.podcastService.deleteEpisode(episodeSearchInput);
    }
}