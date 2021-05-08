import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "../common/output.dto";
import { Episode } from "../entity/episode.entity";
import { Podcast } from "../entity/podcast.entity";

@InputType()
export class CreatePodcastInput {
    @Field(type => String)
    title: string;
    @Field(type => String)
    category: string;
    @Field((type) => [Episode], { nullable: true })
    episodes?: Episode[];
};

@ObjectType()
export class CreatePodcastOutput extends CoreOutput {
    @Field(type => Podcast)
    podcast: Podcast;
}