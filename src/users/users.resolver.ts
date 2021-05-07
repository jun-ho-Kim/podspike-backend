import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './entites/user.entity';
import { UsersService } from './users.service';
import { CreateAccountInput, CreateAccountOutput } from './entites/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { AuthUser } from '../auth/auth-user.decorator';
import { SeeProfileInput, SeeProfileOutput } from './dtos/see-profile.dto';
import { UseGuards } from '../../node_modules/@nestjs/common';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { Role } from 'src/auth/role.decorator';

@Resolver(of => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    // @Query(returns => User)
    // me() {
    //     return '';
    // }

    @Mutation(returns => User)
    async createAccount(
        @Args('input') createAccountInput: CreateAccountInput
    ): Promise<CreateAccountOutput> {
        return this.usersService.createAccount(createAccountInput);
    }

    @UseGuards(AuthUser)
    @Mutation(returns => User)
    login(
        @Args('input') loginInput: LoginInput): Promise<LoginOutput> {
            return this.usersService.login(loginInput);
        }
        
    @Query(returns => User)
    @Role("Any")
    seeProfile(
        @Args('input') seeProfileInput: SeeProfileInput
    ): Promise<SeeProfileOutput> {
         return this.usersService.seeProfile(seeProfileInput.userId);
    }

    @Mutation(returns => User)
    @Role("Any")
    EditProfileInput(
        @AuthUser() owner: User,
        @Args('input') editProfileInput: EditProfileInput
    ): Promise<EditProfileOutput> {
        return this.usersService.editProfile(owner.id, editProfileInput)
    }
};
