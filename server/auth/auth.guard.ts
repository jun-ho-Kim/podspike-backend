import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "server/user/entity/user.entity";
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
        const getContext =  GqlExecutionContext.create(context).getContext();
        const user:User = getContext['user'];
        if(!user) {
            return false;
        }
        if(roles.includes('Any')) {
            return true;
        }
        return roles.includes(user.role);
    } 
}