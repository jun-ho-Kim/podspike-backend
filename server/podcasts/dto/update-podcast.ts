import { CoreEntity } from "../common/entities/coreEntity";
import { Field, InputType, ObjectType } from "../../../node_modules/@nestjs/graphql";
import { Episode } from "../entity/episode.entity";
import { CoreOutput } from "../common/output.dto";

@InputType()
export class UpdatePodcastInput extends CoreEntity  {
    @Field(type => String, {nullable: true})
    title?: string;
    @Field(type => String, {nullable: true})
    category?: string;
    @Field(type => Number, {nullable: true})
    rating?: number;
    @Field(type => Episode,{nullable: true})
    episodes?: Episode[];
}

@ObjectType()
export class UpdatePodcastOutput extends CoreOutput {}