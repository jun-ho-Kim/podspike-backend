import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "server/common/output.dto";

@InputType()
export class SubscribeInput {
    @Field(type => Number)
    podcastId: number;
}

@ObjectType()
export class SubscribeOutput extends CoreOutput {}