import { User } from "./user.entity";
import { InputType, PickType, ObjectType } from "../../../node_modules/@nestjs/graphql";
import { CoreOutput } from "../../podcasts/common/output.dto";


@InputType()
export class CreateAccountInput extends PickType(User, [
    "email",
    "name",
    "password",
    "passwordConfirm",
    "role",
]) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}