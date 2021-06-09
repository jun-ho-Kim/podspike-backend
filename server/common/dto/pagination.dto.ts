import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "../output.dto";

@InputType()
export class PaginationInput {
    @Field(type => Int, {defaultValue: 1})
    page: number;
}

@ObjectType()
export class PaginationOutput extends CoreOutput {
    @Field(type => Number, {nullable: true})
    totalPage?: number;

    @Field(type => Int, {nullable: true})
    totalResults?: number;

    @Field(type => Number, {nullable: true})
    currentPage?: number;

    @Field(type => Number, {nullable: true})
    currentCount?: number;


}