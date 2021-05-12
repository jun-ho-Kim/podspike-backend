import { Field, InputType, ObjectType, PartialType } from "@nestjs/graphql";
import { CoreOutput } from "server/common/output.dto";
import { Column } from "typeorm";
import { User } from "../entity/user.entity";

@InputType()
export class CreateAccountInput extends PartialType(User, InputType) {
}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {
    @Column()
    @Field(type => User, {nullable: true})
    user?: User
};