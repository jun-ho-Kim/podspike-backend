import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './entites/user.entity';
import { UsersService } from './users.service';
import { CreateAccountInput, CreateAccountOutput } from './entites/create-account.dto';

@Resolver(of => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(returns => User)
    me() {
        return '';
    }

    @Mutation(returns => User)
    async createAccount(
        @Args('input') createAccountInput: CreateAccountInput
    ): Promise<CreateAccountOutput> {
        return this.usersService.createAccount(createAccountInput);
    }


};
