import { PartialType, PickType, InputType, ObjectType } from "../../../node_modules/@nestjs/graphql";
import { User } from "../entites/user.entity";
import { CoreOutput } from "../../podcasts/common/output.dto";

@InputType()
export class EditProfileInput extends PartialType(
    PickType(User, ['email', 'name', 'password',])
) {}

@ObjectType()
export class EditProfileOutput extends CoreOutput {}