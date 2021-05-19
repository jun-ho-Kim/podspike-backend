import { PodcastService } from "./podcast.service";
import { Podcast } from "./entity/podcast.entity";
import { Episode } from "./entity/episode.entity";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateEpisodeOutput, CreateEpisodeInput } from "./dto/create-episode";
import { CreatePodcastInput, CreatePodcastOutput } from "./dto/create-podcast.dto";
import { UpdatePodcastOutput, UpdatePodcastInput } from "./dto/update-podcast";
import { CoreOutput } from "../common/output.dto";
import { UpdateEpisodeOutput, UpdateEpisodeInput } from "./dto/update-episode";
import { GetAllPodcastOutput, GetPodcastInput, GetPodcastOutput } from "./dto/get-podcast";
import { GetEpisodeInput, GetEpisodeOutput } from "./dto/get-episode";
import { EpisodeSearchInput, PodcastSearchInput } from "./dto/podcast.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "server/auth/auth.guard";
import { Role } from "server/auth/role.decorator";

@Resolver(of => Podcast)
export class PodcastResolver {
    constructor(
        private readonly podcastService: PodcastService
    ) {}

    @Query(returns => GetAllPodcastOutput)
    getPodcast(): Promise<GetAllPodcastOutput> {
        return this.podcastService.getAllPodcast();
    };
    @Role(["Host"])
    @Mutation(returns => CreatePodcastOutput)
    createPodcast(@Args('input') createPodcastInput: CreatePodcastInput
    ): Promise<CreatePodcastOutput> {
        return this.podcastService.createPodcast(createPodcastInput);
    };

    @Query(returns => GetPodcastOutput)
    getPodcastOne(@Args('input') getPodcastInput: GetPodcastInput
    ): Promise<GetPodcastOutput> {
        return this.podcastService.getPodcastOne(getPodcastInput.id);
    };

    @Role(["Host"])
    @Mutation(returns => UpdatePodcastOutput)
    updatePodcast(@Args('input') updatePodcastInput: UpdatePodcastInput
    ): Promise<UpdatePodcastOutput> { 
        return this.podcastService.updatePodcast(updatePodcastInput);
    };

    @Role(["Host"])
    @Mutation(returns => CoreOutput)
    deletePodcast(@Args('input') {id}: PodcastSearchInput
    ): Promise<CoreOutput> {
        return this.podcastService.deletePodcast(id);
    };

    @Query(returns => GetEpisodeOutput)
    getAllEpisode(@Args('input') getEpisodeInput: GetEpisodeInput
    ): Promise<GetEpisodeOutput> {
        return this.podcastService.getAllEpisode(getEpisodeInput);
    };

    @Role(["Host"])
    @Mutation(returns => CreateEpisodeOutput)
    createEpisode(
        @Args('input') createEpisodeInput: CreateEpisodeInput
    ): Promise<CreateEpisodeOutput> {
        return this.podcastService.CreateEpisode(createEpisodeInput);
    };
    @Role(["Host"])
    @Mutation(returns => UpdateEpisodeOutput)
    updateEpisode(
        @Args('input') updateEpisodeInput: UpdateEpisodeInput
    ): Promise<UpdateEpisodeOutput> {
        return this.podcastService.updateEpisode(updateEpisodeInput);
    };
    @Role(["Host"])
    @Mutation(returns => CoreOutput)
    deleteEpisode(@Args('input') episodeSearchInput: EpisodeSearchInput
   ): Promise<CoreOutput> {
        return this.podcastService.deleteEpisode(episodeSearchInput);
    }
}