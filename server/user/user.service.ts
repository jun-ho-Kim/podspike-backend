import { Injectable } from "@nestjs/common";
import { Args } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "server/jwt/jwt.service";
import { Repository } from "typeorm";
import { CreateAccountInput, CreateAccountOutput } from "./dto/create-account.dto";
import { EditProfileInput, EditProfileOutput } from "./dto/editProfile.dto";
import { LoginInput, LoginOutput } from "./dto/login.dto";
import { SeeProfileOutput } from "./dto/seeProfile.dto";
import { User } from "./entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async createAccount({email, password, passwordConfirm, role}: CreateAccountInput
        ): Promise<CreateAccountOutput> {
            const exist = await this.users.findOne({email});
            if(exist) {
                return {
                    ok: false,
                    error: "'There is a user with that email already'"
                }
            }
            try {
                const user = this.users.create({
                    email,
                    password,
                    passwordConfirm,
                    role
                })
                await this.users.save(user)
                return {
                    ok: true,
                    user,
                }
            } catch {
                return {
                    ok: false,
                    error: "User not created"
                }
            }
        };

    async login({email, password}: LoginInput
        ): Promise<LoginOutput> {
        try {
            const user = await this.users.findOne(
                {email},
                { select: ['id', 'password']}
            );
            const passwordCorrect = await user.checkPassword(password);
            if(!passwordCorrect) {
                return {
                    ok: false,
                    error: "password not correct"
                }
            };

            const token = this.jwtService.sign(user.id);
            return {
                ok: true,
                token,
            }
        } catch {
            return {
                ok: false,
            }
        }
    };

    async seeProfile({id}): Promise<SeeProfileOutput> {
        try {
            const user = await this.users.findOne({id});
            if(!user) {
                return {
                    ok: false,
                    error: "User not found",
                }
            }
            return {
                ok: true,
                user
            }
        } catch {
            return {
                ok: false,
                error: "User not found",
            }
        }
    };
    async editProfile(userId, { email, password}: EditProfileInput
    ): Promise<EditProfileOutput> {
        try {
            const user = await this.users.findOne(userId);
            if(email) {
                user.email = email;
            };
            if(password) {
                user.password = password;
            };
            await this.users.save(user);
            return {
                ok: true,
                user,
            }
        } catch {
            return {
                ok: false,
            }
        }
    }
}   