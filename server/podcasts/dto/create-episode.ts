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
    @Field(type => Number, {nullable: true})
    seenNum?: number
    @Field(type => String, {nullable: true})
    audioUrl?: string;
    @Field(type => Number, {nullable: true})
    audioLength?: number;
  }

@ObjectType()
export class CreateEpisodeOutput extends CoreOutput {
    @Field(type => Episode, {nullable: true})
    episode?: Episode;
}