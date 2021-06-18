import { UseGuards } from "@nestjs/common";
import { Args, Query, Mutation, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "server/auth/auth.guard";
import { AuthUser } from "server/auth/auth.user";
import { Role } from "server/auth/role.decorator";
import { Podcast } from "server/podcasts/entity/podcast.entity";
import { CreateAccountInput, CreateAccountOutput } from "./dto/create-account.dto";
import { EditProfileInput, EditProfileOutput } from "./dto/editProfile.dto";
import { LoginInput, LoginOutput } from "./dto/login.dto";
import { PlayedEpisodedInput, PlayedEpisodedOutput } from "./dto/markEpisodeAsPlayed";
import { SawEpisodesInput, SawEpisodesOutput } from "./dto/sawEpisode";
import { SeeProfileInput, SeeProfileOutput } from "./dto/seeProfile.dto";
import { SubscribeInput, SubscribeOutput } from "./dto/subscribe";
import { SubscriptionOutput } from "./dto/subscriptions";
import { User } from "./entity/user.entity";
import { UserService } from "./user.service";


@Resolver(of => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService
    ) {}

    @Mutation(returns => CreateAccountOutput)
    createAccount(@Args('input') createAccountInput: CreateAccountInput
    ): Promise<CreateAccountOutput> {
        return this.userService.createAccount(createAccountInput)
    }
    

    @Mutation(returns => LoginOutput)
    login(@Args('input') loginInput: LoginInput
    ): Promise<LoginOutput> {
        return this.userService.login(loginInput);
    }
    @Role(["Any"])
    @Query(returns => SeeProfileOutput)
    seeProfile(@Args('input') seeProfileInput: SeeProfileInput
    ): Promise<SeeProfileOutput> {
        return this.userService.seeProfile(seeProfileInput)
    };

    @Role(["Any"])
    @Query(returns => User)
    me(@AuthUser() authUser: User): User {
        return authUser;
    }
    
    @Role(["Any"])
    @Mutation(returns => EditProfileOutput)
    editProfile(
        @AuthUser() authUser: User,
        @Args('input') editProfileInput: EditProfileInput
    ): Promise<EditProfileOutput> {
        return this.userService.editProfile(authUser.id, editProfileInput);
    }

    @Role(['Listener'])
    @Query(returns => SubscriptionOutput)
    subscriptions(
        @AuthUser() user: User
    ): SubscriptionOutput {

        return {
            ok: true,
            subscriptions: [...user.subscriptions],
            subscriptionCount: user.subscriptions.length
        }
    }

    @Role(['Listener'])
    @Mutation(returns => SubscribeOutput)
    subscribe(
        @AuthUser() user: User,
        @Args('input') subscribeInput: SubscribeInput
    ): Promise<SubscribeOutput> {
        return this.userService.subscribe(user, subscribeInput);
    };

    @Role(['Listener'])
    @Mutation(returns => SawEpisodesOutput)
    sawEpisodes(
        @AuthUser() user: User,
        @Args('input') sawEpisodeInput: SawEpisodesInput
    ) : Promise<SawEpisodesOutput> {
        return this.userService.sawEpisodes(user, sawEpisodeInput);
    }

    @Role(['Listener'])
    @Query(returns => PlayedEpisodedOutput)
    playedLists(
        @AuthUser() user: User,
        @Args('input') playedEpisodedInput: PlayedEpisodedInput
    ): Promise<PlayedEpisodedOutput> {
        return this.userService.playedLists(user, playedEpisodedInput);
    }
} 