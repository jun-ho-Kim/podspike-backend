import { User } from "../entites/user.entity";
import { PickType, InputType, ObjectType, Field } from "../../../node_modules/@nestjs/graphql";
import { CoreOutput } from "../../podcasts/common/output.dto";

@InputType()
export class LoginInput extends PickType(User, [
    'email',
    'password',
]) {}

@ObjectType()
export class LoginOutput extends CoreOutput {
    @Field(type => String, {nullable: true})
    token?: string;
}