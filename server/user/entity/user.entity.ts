import { Field, ObjectType } from "@nestjs/graphql";
import { IsEnum, IsString } from "class-validator";
import { CoreEntity } from "server/podcasts/common/entities/coreEntity";
import { Podcast } from "server/podcasts/entity/podcast.entity";
import { Column, Entity, OneToMany } from "typeorm";

export enum UserRole  {
    Host = "Host",
    Listener = "Listener",
};

@ObjectType()
@Entity()
export class User extends CoreEntity {
    @Column()
    @Field(type => String)
    @IsString()
    email: string;

    @Column()
    @Field(type => String)
    @IsString()
    password: string;

    @Column({type: 'enum', enum: UserRole})
    @Field()
    @IsEnum(UserRole)
    role: UserRole;

    @Column()
    @Field(type => [Podcast])
    @OneToMany(
        type => Podcast,
        podcast => podcast.user,
    )
    podcasts: Podcast[];
    
}