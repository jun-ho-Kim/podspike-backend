import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "server/jwt/jwt.service";
import { Episode } from "server/podcasts/entity/episode.entity";
import { Podcast } from "server/podcasts/entity/podcast.entity";
import { Repository } from "typeorm";
import { CreateAccountInput, CreateAccountOutput } from "./dto/create-account.dto";
import { EditProfileInput, EditProfileOutput } from "./dto/editProfile.dto";
import { LoginInput, LoginOutput } from "./dto/login.dto";
import { PlayedEpisodedInput, PlayedEpisodedOutput } from "./dto/markEpisodeAsPlayed";
import { MyPodcastsOutput } from "./dto/myPodcasts.dto";
import { SeeProfileOutput } from "./dto/seeProfile.dto";
import { SubscribeInput, SubscribeOutput } from "./dto/subscribe";
import { User } from "./entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>,
        @InjectRepository(Podcast)
        private readonly podcasts: Repository<Podcast>,
        @InjectRepository(Episode)
        private readonly episodes: Repository<Episode>,
        private readonly jwtService: JwtService,
    ) {}

    async createAccount({email, password, passwordConfirm, role, nickName, profilePhoto}: CreateAccountInput
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
                    role,
                    nickName,
                    profilePhoto,
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
        } catch(error) {
            return {
                ok: false,
                error, 
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
    async editProfile(userId, { email, password, role}: EditProfileInput
    ): Promise<EditProfileOutput> {
        try {
            const user = await this.users.findOne(userId);
            if(email) {
                user.email = email;
            };
            if(password) {
                user.password = password;
            };
            if(role) {
                user.role = role;
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
    };

    async subscribe(
        user,{podcastId}: SubscribeInput
    ): Promise<SubscribeOutput> {
        try {
            const podcast = await this.podcasts.findOne({id: podcastId});
            if(!podcast) {
                return { ok: false, error: "Podcast not found"}
            }
            if(user.subscriptions.some((sub) => sub.id === podcast.id)) {
                user.subscriptions = user.subscriptions.filter((sub) => sub.id !== podcast.id)
                return {ok: true} 
            } else {
                user.subscriptions = [...user.subscriptions, podcast];
                return {ok: true} 
            }
        } catch {
            return {ok: false, error: "Fail subscription "}
        } finally {
            await this.users.save(user);
        }
    };

    async playedLists(
        user: User,
        {episodeId}: PlayedEpisodedInput
    ): Promise<PlayedEpisodedOutput> {
        try {
            const episode = await this.episodes.findOne(episodeId)
            if(!episode) {
                return {ok: false, error: "Episode not found"}
            }
            user.playedLists = [...user.playedLists, episode]
            await this.users.save(user);
            return {
                ok: true,
                playedLists: user.playedLists,
            }
        } catch {
            return {
                ok: false,
            }
        }
    };
} 