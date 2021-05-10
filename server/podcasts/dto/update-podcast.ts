import { Field, InputType, IntersectionType, ObjectType, OmitType, PartialType } from "@nestjs/graphql";
import { Episode } from "../entity/episode.entity";
import { CoreOutput } from "../common/output.dto";
import { PodcastSearchInput } from "./podcast.dto";
import { Podcast } from "../entity/podcast.entity";

@InputType()
export class UpdatePodcastInput extends IntersectionType(
    PodcastSearchInput,
    PartialType(OmitType(Podcast, ['id', 'episodes'])),
  ) {}

@ObjectType()
export class UpdatePodcastOutput extends CoreOutput {
    @Field(type => Podcast, {nullable: true})
    podcast?: Podcast;
}