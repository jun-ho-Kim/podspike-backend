import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "server/common/output.dto";
import { Column } from "typeorm";
import { User } from "../entity/user.entity";

@InputType()
export class SeeProfileInput extends PickType(User, ['id', 'email']) {}

@ObjectType()
export class SeeProfileOutput extends CoreOutput {
    @Column()
    @Field(type => User, {nullable: true})
    user?: User
}