import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "server/user/user.service";
import { JwtService } from "./jwt.service";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        if('x-jwt' in req.headers) {
            const token = req.headers['x-jwt'];
            try {
                const decoded = await this.jwtService.verify(token.toString());
                if(typeof decoded === "object" && decoded.hasOwnProperty('id')) {
                    const {user, ok} = await this.userService.seeProfile(decoded);
                    if(ok) {
                        req["user"] = user
                    }
                }
            } catch(err) {
                console.log(err);
            }
        };
        next();
    }
}

