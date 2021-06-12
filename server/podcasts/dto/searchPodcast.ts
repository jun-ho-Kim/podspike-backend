import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { PaginationInput, PaginationOutput } from "server/common/dto/pagination.dto";
import { Podcast } from "../entity/podcast.entity";

@InputType()
export class SearchPodcastInput extends PaginationInput {
    @Field(type => String)
    query: string;
    @Field(type => Number, {defaultValue: 3})
    takeNumber: number;
}

@ObjectType()
export class SearchPodcastOutput extends PaginationOutput {
    @Field(type => [Podcast], {nullable: true})
    podcasts?: Podcast[];
}