import { Field, InputType, ObjectType } from "../../../node_modules/@nestjs/graphql";
import { Episode } from "../entity/episode.entity";
import { CoreOutput } from "../common/output.dto";
import { PodcastSearchInput } from "./podcast.dto";
import { IsOptional } from "class-validator";
import { Podcast } from "../entity/podcast.entity";

@InputType()
export class UpdatePodcastInput extends PodcastSearchInput  {
    @Field(type => String, {nullable: true})
    @IsOptional()
    title?: string;
    @Field(type => String, {nullable: true})
    @IsOptional()
    category?: string;
    @Field(type => Number, {nullable: true})
    @IsOptional()
    rating?: number;
    @Field(type => [Episode],{nullable: true})
    episodes?: Episode[];
}

@ObjectType()
export class UpdatePodcastOutput extends CoreOutput {
    @Field(type => Podcast, {nullable: true})
    podcast?: Podcast;
}