import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "../common/output.dto";
import { Episode } from "../entity/episode.entity";
import { Podcast } from "../entity/podcast.entity";

@InputType()
export class CreatePodcastInput extends PickType(Podcast, ['title', 'category']) {
};

@ObjectType()
export class CreatePodcastOutput extends CoreOutput {
    @Field(type => Podcast, {nullable: true})
    podcast?: Podcast;
}