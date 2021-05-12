import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "../../common/output.dto";
import { Episode } from "../entity/episode.entity";

@InputType()
export class GetEpisodeInput extends PickType(Episode, ['id']) {
    
}

@ObjectType()
export class GetEpisodeOutput extends CoreOutput {
    @Field(type => [Episode], {nullable: true})
    episodes?: Episode[];
}