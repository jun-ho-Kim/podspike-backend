import { CoreEntity } from "../common/entities/coreEntity";
import { Field, InputType, ObjectType } from "../../../node_modules/@nestjs/graphql";
import { CoreOutput } from "../common/output.dto";

@InputType()
export class DeleteInput extends CoreEntity {
    @Field(type => Number)
    id: number
};

@InputType()
export class EpisodeSearchInput extends DeleteInput {
    @Field(type => Number)
    episodeId: number
}
@ObjectType()
export class DeleteOutput extends CoreOutput {};

