import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "server/common/output.dto";
import { User } from "server/user/entity/user.entity";
import { Podcast } from "../entity/podcast.entity";

@InputType()
export class SeenEpisodeUserInput extends PickType(User, ['id']) {}

@ObjectType()
export class SeenEpisodeUserOutput extends CoreOutput {
    @Field(type => Number, {nullable: true})
    subscriptionCount?: number
}

