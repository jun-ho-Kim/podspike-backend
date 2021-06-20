import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "server/common/output.dto";
import { Episode } from "../entity/episode.entity";

@InputType()
export class PopularEpisodesInput {}

@ObjectType()
export class PopularEpisodesOutput extends CoreOutput {
    @Field(type =>[Episode], {nullable: true})
    popularEpisodes?: Episode[];

}