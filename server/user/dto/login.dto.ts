import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "server/common/output.dto";
import { User } from "../entity/user.entity";

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends CoreOutput {
    @Field(type => String, {nullable: true})
    token?: string;
}