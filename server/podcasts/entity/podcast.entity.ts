import { Episode } from "./episode.entity";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, RelationId } from "typeorm";
import { IsNumber, IsString } from "class-validator";
import { CoreEntity } from "../../common/entities/coreEntity";
import { User } from "server/user/entity/user.entity";
import { Review } from "./review.entity";

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
    @Field(type => String, {nullable: true})
    @IsString()
    description: string;

    @Column()
    @Field(type => Number)
    @IsNumber()
    rating?: number;

    @Column({ nullable: true })
    @Field(type => String, { nullable: true })
    @IsString()
    thumbnail?: string;

    @Field(type => [User], {nullable: true})
    @ManyToMany(
        type => User,
        user => user.subscriptions,
        // {eager: true}
    )
    @JoinTable()
    subscriber?: User;

    @Field(type => [Episode], { nullable: true })
    @OneToMany(() => Episode, (episode) => episode.podcast, {
        cascade: true,
    })
    episodes?: Episode[];

    @Field(type => User)
    @ManyToOne(
        type => User,
        user => user.podcasts,
        // { eager: true }
        )
        host: User;
    @RelationId((podcast: Podcast) => podcast.host)
    hostId: number;

    @Field(type => [Review], {nullable: true})
    @OneToMany(
        type => Review,
        review => review.podcast,
        { eager: true }
    )
    reviews?: Review[]
};
