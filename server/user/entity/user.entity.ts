import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsEnum, IsString } from "class-validator";
import { CoreEntity } from "server/common/entities/coreEntity";
import { Podcast } from "server/podcasts/entity/podcast.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { InternalServerErrorException } from "@nestjs/common";
import { Review } from "server/podcasts/entity/review.entity";
import { Episode } from "server/podcasts/entity/episode.entity";
        

export enum UserRole  {
    Host = "Host",
    Listener = "Listener",
};

registerEnumType(UserRole, { name: 'UserRole' })
@InputType("UserInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
    @Column()
    @Field(type => String)
    @IsString()
    nickName: string;

    @Column()
    @Field(type => String)
    @IsString()
    profilePhoto: string;

    @Column()
    @Field(type => String)
    @IsString()
    email: string;

    @Column()
    @Field(type => String)
    @IsString()
    password: string;

    @Column()
    @Field(type => String)
    @IsString()
    passwordConfirm: string;

    @Column()
    @Field(type => UserRole)
    @IsEnum(UserRole)
    role: UserRole;

    @Field(type => [Podcast])
    @OneToMany(
        type => Podcast,
        podcast => podcast.host,
        
    )
    podcasts: Podcast[];

    @Field(type => [Podcast])
    @ManyToMany(
        type => Podcast, 
        {eager: true}
    )
    @JoinTable()
    subscriptions: Podcast[];

    @Field(type => [Review], {nullable: true})
    @OneToMany(
        type => Review, 
        review => review.creator,
        {eager: true}
    )
    reviews?: Review[]

    @Field(type => [Episode], {nullable: true})
    @OneToMany(
        type => Episode,
        playedList => playedList.player
    )
    playedLists: Episode[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassowrd(): Promise<void> {
        try {
            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds)
        } catch {
            throw new InternalServerErrorException();
        } 
    };
    async checkPassword(aPassword: string): Promise<boolean> {
        try {
            const ok = bcrypt.compare(aPassword, this.password);
            return ok
        } catch {
            throw new InternalServerErrorException();
        }
    }
    
}