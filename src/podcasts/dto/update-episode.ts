import { CoreEntity } from "../common/entities/coreEntity";
import { Field, ObjectType, InputType } from "../../../node_modules/@nestjs/graphql";
import { CoreOutput } from "../common/output.dto";

@InputType()
export class UpdateEpisodeInput extends CoreEntity {
    @Field(type => String)
    title?: string;
    @Field(type => String)
    category?: string;
    @Field(type => Number)
    rating?: number;
}

@ObjectType()
export class UpdateEpisodeOutput extends CoreOutput {}