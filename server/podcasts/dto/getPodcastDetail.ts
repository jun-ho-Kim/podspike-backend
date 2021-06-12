import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql"
import { CoreOutput } from "server/common/output.dto";
import { Episode } from "../entity/episode.entity";


@InputType()
export class GetEpisodeDetailInput extends PickType(Episode, ['id'])  {
}

@ObjectType()
export class GetEpisodeDetailOutput extends CoreOutput {
    @Field(type => Episode, {nullable: true})
    episode?: Episode;
}