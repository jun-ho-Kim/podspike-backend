import { NestMiddleware, Injectable } from "../../node_modules/@nestjs/common";
import { JwtService } from "./jwt.service";
import { UsersService } from "../users/users.service";
import { NextFunction, Request, Response } from "../../node_modules/@types/express";

@Injectable()
export class JwtMiddleware implements NestMiddleware {  
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        if('x-jwt' in req.header) {
            const token = req.header['x-jwt']
            try {
                const decoded = this.jwtService.verify(token.toString());
                if(typeof decoded === "object" && decoded.hasOwnProperty('id')) {
                    const user = this.usersService.findById(decoded['id']);
                    req['user'] = user;
                }
            } catch(e) {
            }
        }
        next();
    } 
};