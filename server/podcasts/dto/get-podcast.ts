import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { PaginationInput, PaginationOutput } from "server/common/dto/pagination.dto";
import { CoreOutput } from "../../common/output.dto";
import { Podcast } from "../entity/podcast.entity";

@InputType()
export class GetPodcastInput extends PickType(Podcast, ['id']) {
};

@ObjectType()
export class GetPodcastOutput extends CoreOutput {
    @Field(type => Podcast, {nullable: true})
    podcast?: Podcast;
};

@InputType()
export class GetAllPodcastInput extends PaginationInput {
};

@ObjectType()
export class GetAllPodcastOutput extends PaginationOutput {
    @Field(type => [Podcast])
    podcast?: Podcast[];
};
