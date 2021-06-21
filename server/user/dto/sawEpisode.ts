import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "server/common/output.dto";
import { Episode } from "server/podcasts/entity/episode.entity";


@InputType()
export class SawEpisodesInput extends PartialType(PickType(Episode, ['id'])) {}

@ObjectType()
export class SawEpisodesOutput extends CoreOutput {
    @Field(type => [Episode], {nullable: true})
    sawEpisodes?: Episode[];

    @Field(type => Boolean, {nullable: true})
    isSawEpisode?: boolean;
}