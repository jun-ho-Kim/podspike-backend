import { Injectable } from "@nestjs/common";
import { Podcast } from "./entity/podcast.entity";
import { Episode } from "./entity/episode.entity";
import { UpdatePodcastInput, UpdatePodcastOutput } from "./dto/update-podcast";
import { UpdateEpisodeInput, UpdateEpisodeOutput } from "./dto/update-episode";
import { GetAllPodcastOutput, GetPodcastInput, GetPodcastOutput } from "./dto/get-podcast";
import { CreateEpisodeInput, CreateEpisodeOutput } from "./dto/create-episode";
import { CoreOutput } from "../common/output.dto";
import { CreatePodcastInput, CreatePodcastOutput } from "./dto/create-podcast.dto";
import { GetEpisodeInput, GetEpisodeOutput } from "./dto/get-episode";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, In, Raw, Repository } from "typeorm";
import { EpisodeSearchInput } from "./dto/podcast.dto";
import { SearchPodcastInput, SearchPodcastOutput } from "./dto/searchPodcast";
import { CreateReviewInput, CreateReviewOutput } from "./dto/create-review.dto";
import { Review } from "./entity/review.entity";
import { User } from "server/user/entity/user.entity";
import { CategoriesInput, CategoriesOutput } from "./dto/categories";
import { GetEpisodeDetailInput, GetEpisodeDetailOutput } from "./dto/getPodcastDetail";
import { MyPodcastsOutput } from "server/user/dto/myPodcasts.dto";
import { SubscriptionOutput } from "../user/dto/subscriptions";
import { PopularEpisodesOutput, PopularPodcastsOutput } from "./dto/popular";

@Injectable()
export class PodcastService {
    constructor (
        @InjectRepository(Podcast) 
        private readonly podcasts: Repository<Podcast>,
        @InjectRepository(Episode)
        private readonly episodes: Repository<Episode>,
        @InjectRepository(Review)
        private readonly reviews: Repository<Review>
    ) {}


    async getAllPodcast(page): Promise<GetAllPodcastOutput>{
        const podcast = await this.podcasts.find({
            relations: ['episodes', 'host', 'subscriber'],
            order: {createdAt: "DESC"},
            skip: (page-1) * 6,
            take: 6
        }
        );
        
        if(!podcast) {
            return {
                ok: false,
                error: "Podcast not found",
                podcast,
            }
        };
        return {
            ok: true,
            podcast,

        }
    }
        
    async createPodcast(host: User, {title, category, description, thumbnail}: CreatePodcastInput): Promise<CreatePodcastOutput> {
        try {
            if(host.role !== "Host") {
                return {ok: false, error: "방송을 개설할 권한이 없습니다."}
            }
            const podcast = await this.podcasts.save(
                this.podcasts.create({
                    title,
                    category,
                    description,
                    thumbnail,
                    rating: 0,
                    host,
                    subscriberNum: 0,
                })
            );
            return {
                ok: true,
                podcast,
            }
        } catch(error) {
            return {
                ok: false,
                error: 'podcast not created',
            }
        }
    };

    async getPodcastOne(id: number): Promise<GetPodcastOutput> {
        const podcast = await this.podcasts.findOne(id, {
            relations: ['episodes', 'subscriber']
        });
        if(!podcast) {
            return {
                ok: false,
                error: 'Podcast not Found',
            }
        };
        return {
            ok: true,
            podcast,
        };
    };

    async deletePodcast(user, id: number): Promise<CoreOutput>{
        try {
            const podcast = await this.podcasts.findOne(id);
            if(podcast.host.id !== user.id) {
                return {
                    ok: false,
                    error: "방송을 삭제할 권한이 없습니다."
                }
            }
            await this.podcasts.delete(id)
            return {
                ok: true
            } 
        } catch(error) {
            return {
                error,
                ok: false
            }
        }
    };
    async updatePodcast(user, {id, ...updateData}: UpdatePodcastInput): Promise<UpdatePodcastOutput> {
        const podcast = await this.podcasts.findOne(id);
        if(!podcast) {
            return {
                ok: false,
                error: "방송이 존재하지 않습니다."
            }
        };
        if(podcast.hostId !== user.id) {
            return {
                ok: false,
                error: "방송을 수정할 권한이 없습니다."
            }
        }
        if(podcast) {
            this.podcasts.save({
                ...podcast, ...updateData
            })
            return {
                ok: true,
                error: null,
                podcast,
            };
        } else {
            return {
                ok: false,
                error: "Podcast is Not Found"
            };
        }
    };

    async searchPodcast(
        {query, page}: SearchPodcastInput
        ): Promise<SearchPodcastOutput> {
            try {
                const [podcasts, totalResults] = await this.podcasts.findAndCount({
                    where: {
                        title: Raw(name => `${name} Like '%${query}'`)
                    },
                    skip: (page-1) * 2,
                    take: 2,
                })
                return {
                    ok: true,
                    totalResults,
                    podcasts,
                    totalPage: Math.ceil(totalResults),
                }
            } catch {
                return {
                    ok: false,
                    error: "Could not search Podcasts",
                }
            }
    };

    async recentPodcast(): Promise<GetAllPodcastOutput>{
        const podcast = await this.podcasts.find({
            relations: ['episodes', 'host', 'subscriber'],
            order: {createdAt: "DESC"},
            take: 6,
        }
        );
        
        if(!podcast) {
            return {
                ok: false,
                error: "Podcast not found",
                podcast,
            }
        };
        return {
            ok: true,
            podcast,
        }
    }

    async popularPodcasts(page): Promise<PopularPodcastsOutput> {
        try {
            const popularPodcasts = await this.podcasts.find({
                order: {'subscriberNum': 'DESC'},
                skip: (page-1) * 20,
                take: 20
            })
            return {
                ok: true,
                popularPodcasts,
            }
        } catch(error) {
            console.log("popularPodcasts Error", error)
        }
    }


    async getAllEpisode({id: podcastId}: GetEpisodeInput): Promise<GetEpisodeOutput> {
        const {podcast} = await this.getPodcastOne(podcastId);
        if(!podcast) {
            return {ok: false, error: "팟캐스트를 찾지 못했습니다."}
        }
        const episodes = await this.episodes.find({
            relations: ['seenUser'],
            order: {updateAt: "DESC"},
            where: {podcast: {id: podcastId}}
        });
        console.log("getAllEpisode", episodes)
        if(!episodes) {
            return {
                ok: false,
                error: "Episode not found",
            }
        }
        return {
            ok: true,
            episodes,
        };
    };

    async CreateEpisode(user, {id, title, episodeImg, description, seenNum, audioUrl, audioLength}: CreateEpisodeInput): Promise<CreateEpisodeOutput> {
        try{
            // if(episodeImg === undefined) {
            //     episodeImg = "";
            // }
            const {podcast} = await this.getPodcastOne(id);
            if(podcast.host.id !== user.id) {
                return {
                    ok: false,
                    error: "에피소드를 생성할 권한이 없습니다."
                }
            }
            const episode = await this.episodes.save(
                this.episodes.create({
                    title,
                    description,
                    podcast,
                    audioUrl,
                    audioLength,
                    seenNum,
                    episodeImg,
                })    
            );
            return {
                episode,
                ok: true,
            };
        } catch(error) {
            return {
                ok: false,
                error,
            }
        }
    };

    async deleteEpisode({id}: EpisodeSearchInput): Promise<CoreOutput> {
        try {
            await this.episodes.delete(id);
            return {
                ok: true
            };
        } catch(error) {
            return { 
                ok: false,
                error: "episode not delete"
            }
        }
    };

    async updateEpisode(user, {id, ...rest}: UpdateEpisodeInput): Promise<UpdateEpisodeOutput> {
        try {
            const episode = await this.episodes.findOne(id);
            if(!episode) {
                return {
                    ok: false,
                    error: "에피소드가 존재하지 않습니다."
                }
            };
            if(episode.podcast.host.id !== user.id) {
                return {
                    ok: false,
                    error: "에피소드를 수정할 권한이 없습니다."
                }
            }

            this.episodes.save({...episode, ...rest});
            return {
                ok: true,
                episode,
            };
        } catch(error) {
            return {
                ok: false,
                error: "Episode not update"
            }
        }
    };

    async createReview(creator: User, {podcastId, title, text}: CreateReviewInput): Promise<CreateReviewOutput> {
        try {
            const podcast = await this.podcasts.findOne(podcastId)
            console.log("creatReview podcast", podcast)
                const reviews = await this.reviews.create({
                    title,
                    text,
                    podcast,
                    creator
                })
                const review = await this.reviews.save(reviews)
            return {
                ok: true,
                review,
            }
        } catch {
            return {
                ok: false,
                error: "Fail Create review"
            }
        }
    };
    async categories({page, category, takeNumber}: CategoriesInput): Promise<CategoriesOutput> {
        const query = await getRepository(Podcast)
            .createQueryBuilder("podcast")
            .leftJoinAndSelect('podcast.subscriber', 'subscriber')
            .where("podcast.category=:category", {category});
        const totalResults = await query.getCount();
        const totalPage = Math.ceil(totalResults/10);
        const [podcasts, currentCount] = await query
            .orderBy("podcast.createdAt", "DESC")
            .skip((page-1)*10)
            .take(10)
            .getManyAndCount()
        // console.log("query", query);
        console.log("totalCount", totalResults);
        console.log("category podcast", podcasts);
        console.log('totalPage', currentCount);
        // console.log('category subscriber', query.where({subscriber: ""}).getManyAndCount());

        return {
            ok: true,
            totalResults,
            totalPage,
            currentCount,
            podcasts,
            currentPage: page,
        }
    }

    async getEpisodeDetail({id}: GetEpisodeDetailInput): Promise<GetEpisodeDetailOutput> {
        const episode = await this.episodes.findOne(id, 
            {relations: ['seenUser']
        })
        if(!episode) {
            return {ok: false, error: "에피소드가 존재하지 않습니다."}
        }
        return {
            ok: true,
            episode,
        }
    };
    async myPodcasts(
        host: User
    ): Promise<MyPodcastsOutput> {
        try {
            const myPodcasts = await this.podcasts.find({host});
            return {
                ok: true,
                myPodcasts,
            }
        } catch(error) {
            console.log(error);
        }
    };

    async popularEpisode(page): Promise<PopularEpisodesOutput> {
        try {
            const [popularEpisodes, popularEpisodesCount  ] = await this.episodes.findAndCount({ 
                    order: {seenNum: 'DESC'}, 
                    take: 6,
                    skip: (page-1) * 6,
                });
            console.log("popularEpisodes", popularEpisodes)
            return {
                ok: true,
                popularEpisodes,
                totalPage: Math.ceil(popularEpisodesCount/6),
                totalResults : popularEpisodesCount,
                currentCount: 6,
                currentPage: page,
            }
        } catch(error) {
            console.log("error", error);
            return {
                ok: false, 
                error
            }
        }
    }
    

    // async searchPodcasts( {query, page, takeNumber}:SearchPodcastInput
    // ):Promise<SearchPodcastOutput> {
    //     const query1 = await getRepository(Podcast)
    //         .createQueryBuilder("podcast")
    //         .where(`podcast.title "ILike": title`, {title: `%${query}%`});

    //     const [podcasts, totalResults] = await query1
    //         .orderBy("DESC")
    //         .take(10)
    //         .getManyAndCount();
    //     return {
    //         ok: true
    //     }
    // }
}