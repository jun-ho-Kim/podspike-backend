import { Inject, Injectable } from "@nestjs/common";
import { CONFIG_OPTIONS } from "server/common/common.constants";
import { jwtModuleOption } from "./jwt.interface";
import * as jwt from "jsonwebtoken";


@Injectable()
export class JwtService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly option: jwtModuleOption
    ) {}
    sign(userId: number): string {
        return jwt.sign({id: userId}, this.option.privateKey)
    };
    verify(token:string) {
        return jwt.verify(token, this.option.privateKey)
    };
}