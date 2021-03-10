import { User } from "../entites/user.entity";
import { PickType, Field, ObjectType, PartialType, ArgsType } from "../../../node_modules/@nestjs/graphql";
import { CoreOutput } from "../../podcasts/common/output.dto";


@ArgsType()
export class SeeProfileInput extends PartialType(PickType(User, [
    'name',
])) {
    @Field(type => Number)
    userId: number;
};

@ObjectType()
export class SeeProfileOutput extends CoreOutput {
    @Field(type => User, {nullable: true})
    user?: User;
}