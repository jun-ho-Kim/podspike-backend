import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "server/common/output.dto";
import { Column } from "typeorm";
import { User } from "../entity/user.entity";

@InputType()
export class  EditProfileInput extends PartialType(
    PickType(User, ['nickName','email', 'password', 'passwordConfirm', 'role', 'profilePhoto'])
 ) {}

@ObjectType()
export class EditProfileOutput extends CoreOutput {
    @Column()
    @Field(type => User, {nullable: true})
    user?: User;
}