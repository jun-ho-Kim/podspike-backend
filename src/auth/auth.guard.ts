import { CanActivate, ExecutionContext, Injectable } from "../../node_modules/@nestjs/common";
import { Reflector } from "../../node_modules/@nestjs/core";
import { GqlExecutionContext } from "../../node_modules/@nestjs/graphql";
import { User } from "../users/entites/user.entity";
import { AllowedRoles } from "./role.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<AllowedRoles>(
            'roles',
            context.getHandler(),
        );
        if(!roles) {
            return true;
        }
        const gqlContext = GqlExecutionContext.create(context).getContext();
        const user: User = gqlContext['user'];
        if(!user) {
            return false;
        }
        if(roles.includes('Any')) {
            return true;
        }
        return roles.includes(user.role);
    }
}