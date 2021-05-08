import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "../common/output.dto";
import { Podcast } from "../entity/podcast.entity";

@InputType()
export class GetPodcastInput {
    @Field(type => Number)
    id: number;
};

@ObjectType()
export class GetAllPodcastOutput extends CoreOutput {
    @Field(type => [Podcast])
    podcast?: Podcast[];
};

@ObjectType()
export class GetPodcastOutput extends CoreOutput {
    @Field(type => Podcast)
    podcast?: Podcast;
};