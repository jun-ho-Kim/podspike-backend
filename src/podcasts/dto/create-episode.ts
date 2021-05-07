import { CoreEntity } from "../common/entities/coreEntity";
import { Field, InputType, ObjectType, PartialType } from "../../../node_modules/@nestjs/graphql";
import { CoreOutput } from "../common/output.dto";
import { Episode } from "../episode/episode.entity";

@InputType({ isAbstract: true })
export class CreateEpisodeInput extends PartialType(Episode) {

}

@ObjectType()
export class CreateEpisodeOutput extends CoreOutput {}