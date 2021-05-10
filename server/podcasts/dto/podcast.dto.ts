import { Field, InputType, PickType } from "@nestjs/graphql";
import { Episode } from "../entity/episode.entity";
import { Podcast } from "../entity/podcast.entity";

@InputType()
export class PodcastSearchInput extends PickType(Podcast, ['id']) {
};

@InputType()
export class EpisodeSearchInput extends PickType(Episode, ['id']) {
}