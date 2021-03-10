import { CanActivate, ExecutionContext } from "../../node_modules/@nestjs/common";
import { Reflector } from "../../node_modules/@nestjs/core";
import { GqlExecutionContext } from "../../node_modules/@nestjs/graphql";
import { User } from "../users/entites/user.entity";


export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext) {
        const gqlContext = GqlExecutionContext.create(context).getContext();
        const user: User = gqlContext['user'];
        if(!user) {
            return false;
        }
        return true;
    }
}