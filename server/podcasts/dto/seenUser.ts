import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "server/common/output.dto";
import { User } from "server/user/entity/user.entity";

@InputType()
export class SeenEpisodeUserInput extends PartialType(PickType(User, ['id'])) {}

@ObjectType()
export class SeenEpisodeUserOutput extends CoreOutput {
    @Field(type => Number, {nullable: true})
    subscriptionCount?: number
}

