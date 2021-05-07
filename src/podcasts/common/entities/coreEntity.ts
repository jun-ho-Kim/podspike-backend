import { Field, ObjectType, InputType } from "../../../../node_modules/@nestjs/graphql";
import { Entity } from "../../../../node_modules/typeorm";

@InputType({isAbstract : true})
@ObjectType()
@Entity()
export class CoreEntity {
    @Field(type => Number)
    id: number;

    // @Field(typed => String)
    // title: string;
    
    // @Field(type => Date)
    // createdAt: Date;

    // @Field(type => Date)
    // updateAt: Date;
}