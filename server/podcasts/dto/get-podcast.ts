import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "../common/output.dto";
import { Podcast } from "../entity/podcast.entity";

@InputType()
export class GetPodcastInput extends PickType(Podcast, ['id']) {
};

@ObjectType()
export class GetAllPodcastOutput extends CoreOutput {
    @Field(type => [Podcast])
    podcast?: Podcast[];
};

@ObjectType()
export class GetPodcastOutput extends CoreOutput {
    @Field(type => Podcast, {nullable: true})
    podcast?: Podcast;
};