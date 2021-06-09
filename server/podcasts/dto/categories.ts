import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { PaginationInput, PaginationOutput } from "server/common/dto/pagination.dto";
import { CoreOutput } from "server/common/output.dto";
import { Podcast } from "../entity/podcast.entity";

@InputType()
export class CategoriesInput extends PaginationInput {
    @Field(type => String)
    category: string;
    @Field(type => Number, {defaultValue: 3})
    takeNumber: number;
};

@ObjectType()
export class CategoriesOutput extends PaginationOutput {
    @Field(type => String, {nullable: true})
    categories?: string;
    @Field(type => [Podcast], {nullable: true})
    podcasts?: Podcast[];
};