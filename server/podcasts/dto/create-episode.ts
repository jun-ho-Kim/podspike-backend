import { CoreEntity } from "../common/entities/coreEntity";
import { Field, InputType, ObjectType } from "../../../node_modules/@nestjs/graphql";
import { CoreOutput } from "../common/output.dto";

@InputType()
export class CreateEpisodeInput extends CoreEntity {
    @Field(type => Number)
    podcastId: number;
    @Field(type => String)
    title: string;
    @Field(type => String)
    category: string;
    @Field(type => Number)
    rating: number;
}

@ObjectType()
export class CreateEpisodeOutput extends CoreOutput {}