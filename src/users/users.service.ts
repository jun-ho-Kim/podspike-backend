import { Injectable } from '@nestjs/common';
import { InjectRepository } from '../../node_modules/@nestjs/typeorm';
import { User } from './entites/user.entity';
import { Repository } from '../../node_modules/typeorm';
import { CreateAccountInput, CreateAccountOutput } from './entites/create-account.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { JwtService } from '../jwt/jwt.service';
import { EditProfileOutput, EditProfileInput } from './dtos/edit-profile.dto';
import { SeeProfileOutput, SeeProfileInput } from './dtos/see-profile.dto';

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
    async editProfile(
        authUser: User,
        {email, password, name}: EditProfileInput
    ): Promise<EditProfileOutput> {
        try {
            const user = await this.users.findOne(authUser.id);
            if(email) {
                user.email = email;
            }
            if(password) {
                user.password = password;
            }
            if(name) {
                user.name = name;
            }
            await this.users.save(user);
            return {
                ok: true,
            }
        } catch {
            return {
                ok: false,
                error: 'Could not update profile',
            }
        }
    };

    async seeProfile(
        {userId}: SeeProfileInput
    ): Promise<SeeProfileOutput> {
        try {
            const user = await this.users.findOne(userId);
            if(!user) {
                return {
                    ok: false,
                    error: "User not Found",
                }
            }
            return {
                user,
                ok: false,
            }
        } catch {
            return {
                ok: true,
                error: ""
            }
        }
    }
}
