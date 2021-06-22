import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { PaginationInput, PaginationOutput } from "server/common/dto/pagination.dto";
import { CoreOutput } from "server/common/output.dto";
import { Episode } from "../entity/episode.entity";
import { Podcast } from "../entity/podcast.entity";

@InputType()
export class PopularPodcastInput extends PaginationInput {}

@InputType()
export class PopularEpisodesInput extends PaginationInput {}

@ObjectType()
export class PopularPodcastsOutput extends PaginationOutput {
    @Field(type =>[Podcast], {nullable: true})
    popularPodcasts?: Podcast[];
}

@ObjectType()
export class PopularEpisodesOutput extends PaginationOutput {
    @Field(type =>[Episode], {nullable: true})
    popularEpisodes?: Episode[];

}