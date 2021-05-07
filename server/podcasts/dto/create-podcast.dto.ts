import { CoreEntity } from "../common/entities/coreEntity";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Episode } from "../entity/episode.entity";
import { CoreOutput } from "../common/output.dto";
import { Podcast } from "../entity/podcast.entity";

@InputType()
export class CreatePodcastInput {
    @Field(type => String)
    title: string;
    @Field(type => String)
    category: string;
};

@ObjectType()
export class CreatePodcastOutput extends CoreOutput {
    @Field(type => Podcast)
    podcast: Podcast;
}