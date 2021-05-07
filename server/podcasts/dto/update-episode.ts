import { CoreEntity } from "../common/entities/coreEntity";
import { Field, ObjectType, InputType } from "../../../node_modules/@nestjs/graphql";
import { CoreOutput } from "../common/output.dto";
import { EpisodeSearchInput } from "./delete.dto";

@InputType()
export class UpdateEpisodeInput extends EpisodeSearchInput {
    @Field(type => String, {nullable: true})
    title?: string;
    @Field(type => String, {nullable: true})
    category?: string;
    @Field(type => Number, {nullable: true})
    rating?: number;
}

@ObjectType()
export class UpdateEpisodeOutput extends CoreOutput {}