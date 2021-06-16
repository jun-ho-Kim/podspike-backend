import { CoreEntity } from "../../common/entities/coreEntity";
import { Field, InputType, IntersectionType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "../../common/output.dto";
import { PodcastSearchInput } from "./podcast.dto";
import { Episode } from "../entity/episode.entity";

@InputType()
export class CreateEpisodeInput extends IntersectionType(
    PodcastSearchInput,
    PickType(Episode, ['title', 'description'] as const),
  ) {
    @Field(type => String, {nullable: true})
    episodeImg?: string
  }

@ObjectType()
export class CreateEpisodeOutput extends CoreOutput {
    @Field(type => Episode, {nullable: true})
    episode?: Episode;
}