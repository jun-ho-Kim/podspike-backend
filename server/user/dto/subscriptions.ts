import { Field, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "server/common/output.dto";
import { Podcast } from "server/podcasts/entity/podcast.entity";

@ObjectType()
export class SubscriptionOutput extends CoreOutput {
    @Field(type => [Podcast], {nullable: true})
    subscriptions?: Podcast[];
}