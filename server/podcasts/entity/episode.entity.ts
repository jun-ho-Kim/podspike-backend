import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";
import { userInfo } from "node:os";
import { User } from "server/user/entity/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { CoreEntity } from "../../common/entities/coreEntity";
import { CoreOutput } from "../../common/output.dto";
import { Podcast } from "./podcast.entity";

@InputType('EpisodeInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Episode extends CoreEntity {
    @Column()
    @Field(type => String)
    @IsString()
    title: string;

    @Column()
    @Field(type => String)
    @IsString()
    category: string;

    @ManyToOne(() => Podcast, (podcast) => podcast.episodes)
    @Field(() => Podcast)
    podcast: Podcast;

    @Field(type => User)
    @ManyToOne(
        type => User,
        user => user.playedLists
    )
    player: User;
}
