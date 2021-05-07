import { Field, ObjectType } from "../../../../node_modules/@nestjs/graphql";

@ObjectType()
export class CoreEntity {
    @Field(type => Number)
    id: number;
    
    // @Field(type => Date)
    // createdAt: Date;

    // @Field(type => Date)
    // updateAt: Date;
}