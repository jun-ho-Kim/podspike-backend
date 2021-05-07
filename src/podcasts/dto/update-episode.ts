import { CoreEntity } from "../common/entities/coreEntity";
import { Field, ObjectType, InputType, PartialType } from "../../../node_modules/@nestjs/graphql";
import { CoreOutput } from "../common/output.dto";
import { Column } from "../../../node_modules/typeorm";
import { Episode } from "../episode/episode.entity";

@InputType()
export class UpdateEpisodeInput extends PartialType(Episode, InputType) {}

@ObjectType()
export class UpdateEpisodeOutput extends CoreOutput {}