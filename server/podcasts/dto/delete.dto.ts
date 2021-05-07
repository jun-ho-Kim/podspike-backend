import { CoreEntity } from "../common/entities/coreEntity";
import { Field } from "../../../node_modules/@nestjs/graphql";
import { CoreOutput } from "../common/output.dto";

export class DeleteInput extends CoreEntity {
    @Field(type => Number)
    id: number
};

export class EpisodeSearchInput extends DeleteInput {
    @Field(type => Number)
    episodeId: number
}

export class DeleteOutput extends CoreOutput {};

