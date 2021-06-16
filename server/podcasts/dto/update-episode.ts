import { Field, ObjectType, InputType, IntersectionType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "../../common/output.dto";
import { Episode } from "../entity/episode.entity";
import { EpisodeSearchInput } from "./podcast.dto";



@InputType()
export class UpdateEpisodeInput extends IntersectionType(
    EpisodeSearchInput,
    PartialType(PickType(Episode, ['title', 'description'] as const)),
  ) {
    @Field(type => String, {nullable: true})
    episodeImg?: string
  }

@ObjectType()
export class UpdateEpisodeOutput extends CoreOutput {
    @Field(type => Episode, {nullable: true})
    episode?: Episode;
}