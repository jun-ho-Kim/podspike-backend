import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PodcastSearchInput {
    @Field(type => Number)
    id: number;
};