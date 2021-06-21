import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "server/common/output.dto";
import { Episode } from "../entity/episode.entity";
import { Podcast } from "../entity/podcast.entity";

@ObjectType()
export class PopularPodcastsOutput extends CoreOutput {
    @Field(type =>[Podcast], {nullable: true})
    popularPodcasts?: Podcast[];

}

@ObjectType()
export class PopularEpisodesOutput extends CoreOutput {
    @Field(type =>[Episode], {nullable: true})
    popularEpisodes?: Episode[];

}