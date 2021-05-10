import { Episode } from "./episode.entity";
import { Field, InputType, ObjectType } from "../../../node_modules/@nestjs/graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { IsNumber, IsString } from "class-validator";
import { CoreEntity } from "../common/entities/coreEntity";

@InputType('PodcastInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Podcast extends CoreEntity {
    @Column()
    @Field(type => String)
    @IsString()
    title: string;

    @Column()
    @Field(type => String)
    @IsString()
    category: string;

    @Column()
    @Field(type => Number)
    @IsNumber()
    rating?: number;

    @Field(type => [Episode], { nullable: true })
    @OneToMany(() => Episode, (episode) => episode.podcast, {
        cascade: true,
    })
    episodes?: Episode[];
};