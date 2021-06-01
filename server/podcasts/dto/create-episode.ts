import { CoreEntity } from "../../common/entities/coreEntity";
import { Field, InputType, IntersectionType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "../../common/output.dto";
import { PodcastSearchInput } from "./podcast.dto";
import { Episode } from "../entity/episode.entity";

@InputType()
export class CreateEpisodeInput extends IntersectionType(
    PodcastSearchInput,
    PickType(Episode, ['title', 'category', 'description', 'episodeImg'] as const),
  ) {}

@ObjectType()
export class CreateEpisodeOutput extends CoreOutput {
    @Field(type => Episode, {nullable: true})
    episode?: Episode;
}