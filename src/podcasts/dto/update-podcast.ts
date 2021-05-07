import { CoreEntity } from "../common/entities/coreEntity";
import { Field, InputType, ObjectType } from "../../../node_modules/@nestjs/graphql";
import { Episode } from "../episode/episode.entity";
import { CoreOutput } from "../common/output.dto";

@InputType()
export class updatePodcastInput extends CoreEntity  {
    @Field(type => String)
    title?: string;
    @Field(type => String)
    category?: string;
    @Field(type => Number)
    rating?: number;
    @Field(type => Episode)
    episodes?: Episode[];
}

@ObjectType()
export class updatePodcastOutput extends CoreOutput {}