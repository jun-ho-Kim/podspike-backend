import { IsDate, IsNumber } from "class-validator";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";

@Entity()
@ObjectType()
export class CoreEntity {
    @PrimaryGeneratedColumn()
    @Field(type => Number)
    @IsNumber()
    id: number;
    
    @CreateDateColumn()
    @Field(type => Date)
    @IsDate()
    createdAt: Date;

    @UpdateDateColumn()
    @Field(type => Date)
    @IsDate()
    updateAt: Date;
}