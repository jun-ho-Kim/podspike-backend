import { Episode } from "../episode/episode.entity";
import { Field, ObjectType, InputType } from "../../../node_modules/@nestjs/graphql";
import { Entity, Column } from "../../../node_modules/typeorm";

@InputType({isAbstract : true})
@ObjectType()
@Entity()
export class Podcast {
    @Column()
    @Field(type => Number)
    id: number;

    @Column()
    @Field(type => String)
    title: string;

    @Column()
    @Field(type => String)
    category: string;

    @Column()
    @Field(type => Number)
    rating: number;

    @Column()
    @Field(type => Episode)
    episodes: Episode[];
};