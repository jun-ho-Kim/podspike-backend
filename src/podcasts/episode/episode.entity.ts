import { Entity } from "../../../node_modules/typeorm";
import { OmitType, ObjectType } from "../../../node_modules/@nestjs/graphql";
import { Podcast } from "../entity/podcast.entity";


@ObjectType()
@Entity()
export class Episode extends OmitType(Podcast, [
    'episodes'
]) {}