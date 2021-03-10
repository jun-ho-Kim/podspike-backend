import { PartialType, PickType, InputType, ObjectType } from "../../../node_modules/@nestjs/graphql";
import { User } from "../entites/user.entity";
import { CoreOutput } from "../../podcasts/common/output.dto";

@InputType()
export class editProfileInput extends PartialType(
    PickType(User, ['email', 'name', 'password',])
) {}

@ObjectType()
export class editProfileOutput extends CoreOutput {}