import { UseGuards } from "@nestjs/common";
import { Args, Query, Mutation, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "server/auth/auth.guard";
import { AuthUser } from "server/auth/auth.user";
import { CreateAccountInput, CreateAccountOutput } from "./dto/create-account.dto";
import { EditProfileInput, EditProfileOutput } from "./dto/editProfile.dto";
import { LoginInput, LoginOutput } from "./dto/login.dto";
import { SeeProfileInput, SeeProfileOutput } from "./dto/seeProfile.dto";
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
    @UseGuards(AuthGuard)
    @Query(returns => SeeProfileOutput)
    seeProfile(@Args('input') seeProfileInput: SeeProfileInput
    ): Promise<SeeProfileOutput> {
        return this.userService.seeProfile(seeProfileInput)
    };

    @UseGuards(AuthGuard)
    @Mutation(Returns => EditProfileOutput)
    editProfile(
        @AuthUser() authUser: User,
        @Args('input') editProfileInput: EditProfileInput
    ): Promise<EditProfileOutput> {
        return this.userService.editProfile(authUser.id, editProfileInput);
    }
    
} 