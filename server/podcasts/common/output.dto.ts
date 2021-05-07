import { Field, ObjectType } from "../../../node_modules/@nestjs/graphql";

@ObjectType()
export class CoreOutput {
    @Field(type => String, {nullable: true})
    error?: string;

    @Field(type => Boolean)
    ok: boolean;    
}