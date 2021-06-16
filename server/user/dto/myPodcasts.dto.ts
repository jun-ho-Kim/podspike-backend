import { Field, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "server/common/output.dto";
import { Podcast } from "server/podcasts/entity/podcast.entity";


@ObjectType()
export class MyPodcastsOutput extends CoreOutput {
    @Field(type => [Podcast], {nullable: true})
    myPodcasts?: Podcast[]
}