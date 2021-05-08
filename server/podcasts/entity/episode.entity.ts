import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType('EpisodeInput', { isAbstract: true })
@ObjectType()
export class Episode {
    @Field(type => Number)
    id: number;
    @Field(type => String)
    title: string;
    @Field(type => String)
    category: string;
}