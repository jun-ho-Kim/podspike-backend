import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "server/common/output.dto";
import { Episode } from "server/podcasts/entity/episode.entity";

@InputType()
export class PlayedEpisodedInput {
    @Field(type => Number)
    episodeId: number
}

@ObjectType()
export class PlayedEpisodedOutput extends CoreOutput {
    @Field(type => [Episode], {nullable: true}) 
    playedLists?: Episode[]
}