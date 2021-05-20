import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "server/common/entities/coreEntity";
import { User } from "server/user/entity/user.entity";
import { Column, Entity,  ManyToOne } from "typeorm";
import { Podcast } from "./podcast.entity";

@InputType('ReviewInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Review extends CoreEntity {
    @Column()
    @Field(type => String)
    title: string;

    @Column()
    @Field(type => String)
    text: string;

    @Field(type => User)
    @ManyToOne(
        type => User, 
        user => user.reviews,
        {onDelete: "CASCADE"}
    )
    creator: User;

    @Field(type => Podcast)
    @ManyToOne(
        type => Podcast,
        podcast => podcast.reviews,
        {onDelete: "CASCADE"}   
    )
    podcast: Podcast;
}