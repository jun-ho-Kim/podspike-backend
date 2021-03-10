import { CoreEntity } from "../../podcasts/common/entities/coreEntity";
import { Entity, Column, BeforeInsert } from "../../../node_modules/typeorm";
import { InputType, ObjectType, Field } from "../../../node_modules/@nestjs/graphql";
import { IsEmail, IsEnum, IsString, IsBoolean } from "class-validator";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "../../../node_modules/@nestjs/common";

export enum UserRole {
    "Host",
    "Listner",
} 

@InputType("UserInputType", {isAbstract: true})
@ObjectType()
@Entity()
export class User extends CoreEntity {
    @Field(type => String)
    @Column()
    @IsEmail()
    email: string;

    @Field(Type => String)
    @Column()
    @IsString()
    name: string;
    
    @Field(type => String)
    @Column()
    @IsString()
    password: string;

    @Field(type => String)
    @Column()
    @IsString()
    passwordConfirm: string;

    @Field(type => UserRole)
    @Column({type: 'enum', enum: UserRole})
    @IsEnum(UserRole)
    role: UserRole;

    @Field(type => Boolean)
    @Column()
    @IsBoolean()
    verified: boolean;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        if(this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10)
                
            } catch(e) {
                console.log(e);
                throw new InternalServerErrorException();
            }
        }
    };

    async checkPassword(aPassword: string): Promise<boolean> {
        try {
            const ok = await bcrypt.compare(aPassword);
            return ok;
        } catch {
            throw new InternalServerErrorException();
        };
    }
}