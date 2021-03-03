import { CoreEntity } from "../common/entities/coreEntity";
import { Field } from "../../../node_modules/@nestjs/graphql";
import { CoreOutput } from "../common/output.dto";

export class DeleteInput extends CoreEntity {
    @Field(type => String)
    title: string
}

export class DeleteOutput extends CoreOutput {}