import { Field, InputType } from "../../../node_modules/@nestjs/graphql";
import { CoreEntity } from "../common/entities/coreEntity";
import { extension } from "../../../node_modules/@types/mime";
import { CoreOutput } from "../common/output.dto";


@InputType()
export class SearchPodcastInput extends CoreEntity {

}


export class SearchEpisodeInput extends CoreEntity {}

export class SearchOutput extends CoreOutput {}