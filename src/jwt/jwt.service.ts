import { Injectable, Inject } from "../../node_modules/@nestjs/common";
import { JwtModuleOption } from "./jwt.interface";
import * as jwt from "jsonwebtoken";
import { CONFIG_OPTIONS } from "../podcasts/common/common.constant";

@Injectable()
export class JwtService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOption,
    ) {}

    sign(userId: number): string {
        return jwt.sign({id: userId}, this.options.privateKey)
    };
    
    verify(token: string) {
        return jwt.verify(token, this.options.privateKey)
    };
}