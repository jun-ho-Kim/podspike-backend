import { Episode } from "../episode/episode.entity";
import { Field } from "../../../node_modules/@nestjs/graphql";

export class Podcast {
    @Field(type => Number)
    id: number;
    @Field(type => String)
    title: string;
    @Field(type => String)
    category: string;
    @Field(type => Number)
    rating: number;
    @Field(type => Episode)
    episodes: Episode[];
};