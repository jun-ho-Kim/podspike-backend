import { Injectable } from '@nestjs/common';
import { InjectRepository } from '../../node_modules/@nestjs/typeorm';
import { User } from './entites/user.entity';
import { Repository } from '../../node_modules/typeorm';
import { CreateAccountInput, CreateAccountOutput } from './entites/create-account.dto';
import { CoreOutput } from '../podcasts/common/output.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { JwtService } from '../jwt/jwt.service';
import { editProfileInput } from './dtos/edit-profile.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async createAccount(
        {
            email, 
            name, 
            password, 
            passwordConfirm, 
            role
        }: CreateAccountInput
    ): Promise<CreateAccountOutput> {
        try {
            const exist = await this.users.findOne({email});
            if(exist) {
                return {
                    ok: false,
                    error: "There is user with that email alread"
                };
            }
            if(password !== passwordConfirm) {
                return {
                    ok: false,
                    error: "Please Confirm password"
                }
            }
            await this.users.save( 
                this.users.create({email, name, password, role})
            )

            return {
                ok: true,
                error: null,
            }
        } catch {
            return {
                ok: false,
                error: ""
            }
        }
    };

    async findById(id: number): Promise<UserProfileOutput> {
        try {
            const user = await this.users.findOne({id});
            if(user) {
                return {
                    ok: true, 
                    user
                }
            } 
        } catch(error) {
            return {
                error,
                ok: true
            }
        }
    };

    async login({email, password}: LoginInput): Promise<LoginOutput> {
        try {
            const user = await this.users.findOne({email})
            if(!user) {
                return {
                    ok: false,
                    error: 'User not Found',
                }
            };
            const passwordCorrect = await user.checkPassword(password);
            if(!passwordCorrect) {
                return {
                    ok: false,
                    error: "Wrong password",
                }
            };
            const token = this.jwtService.sign(user.id);
            return {
                ok: true,
                token
            }
        } catch {
            return {
                error: "User not found",
                ok: false,
            }
        }
    };
}