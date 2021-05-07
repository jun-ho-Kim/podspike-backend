import { ObjectType, Field } from "../../../node_modules/@nestjs/graphql";
import { User } from "../entites/user.entity";
import { CoreOutput } from "../../podcasts/common/output.dto";


@ObjectType()
export class UserProfileOutput extends CoreOutput {
    @Field(type => User, {nullable: true})
    user?: User;
}