import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "server/common/output.dto";
import { Review } from "../entity/review.entity";

@InputType()
export class CreateReviewInput extends PickType(Review, ["title", "text"], InputType) {
    @Field(type => Number)
    podcastId: number
}

@ObjectType()
export class CreateReviewOutput extends CoreOutput {
    @Field(type => Review, {nullable: true})
    review?: Review
}