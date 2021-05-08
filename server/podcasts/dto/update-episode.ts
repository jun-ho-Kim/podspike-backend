import { fieldToFieldConfig } from "graphql-tools";
import { Field, ObjectType, InputType } from "../../../node_modules/@nestjs/graphql";
import { CoreOutput } from "../common/output.dto";
import { Episode } from "../entity/episode.entity";
import { EpisodeSearchInput } from "./delete.dto";


@InputType()
export class UpdateEpisodeInput extends EpisodeSearchInput {
    @Field(type => String, {nullable: true})
    title?: string;
    @Field(type => String, {nullable: true})
    category?: string;
    @Field(type => Number, {nullable: true})
    rating?: number;
    @Field((type) => [Episode], { nullable: true })
    episodes?: Episode[];
}

@ObjectType()
export class UpdateEpisodeOutput extends CoreOutput {
    @Field(type => Episode, {nullable: true})
    episode?: Episode;
}