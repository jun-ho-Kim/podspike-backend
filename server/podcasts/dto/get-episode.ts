import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "../common/output.dto";
import { Episode } from "../entity/episode.entity";

@InputType()
export class GetEpisodeInput {
    @Field(type => Number)
    id: number;
}

@ObjectType()
export class GetEpisodeOutput extends CoreOutput {
    @Field(type => [Episode], {nullable: true})
    episode?: Episode[];
}