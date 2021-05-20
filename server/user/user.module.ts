import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { User } from "./entity/user.entity";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { Podcast } from "server/podcasts/entity/podcast.entity";
import { Episode } from "server/podcasts/entity/episode.entity";


@Module({
    imports: [TypeOrmModule.forFeature([User, Podcast, Episode])],
    providers: [UserService, UserResolver],
    exports: [UserService],
})
export class UserModule {}