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
import { Raw, Repository } from "typeorm";
import { EpisodeSearchInput } from "./dto/podcast.dto";
import { SearchPodcastInput, SearchPodcastOutput } from "./dto/searchPodcast";
import { CreateReviewInput, CreateReviewOutput } from "./dto/create-review.dto";
import { Review } from "./entity/review.entity";
import { User } from "server/user/entity/user.entity";

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


    async getAllPodcast(): Promise<GetAllPodcastOutput>{
        const podcast = await this.podcasts.find({
            relations: ['episodes']
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
        
    async createPodcast(user, {title, category}: CreatePodcastInput): Promise<CreatePodcastOutput> {
        try {
            const podcast = await this.podcasts.save(
                this.podcasts.create({
                    title,
                    category,
                    rating: 0,
                    user,
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
            relations: ['episodes']
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

    async deletePodcast(id: number): Promise<CoreOutput>{
        try {
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
    async updatePodcast({id, ...updateData}: UpdatePodcastInput): Promise<UpdatePodcastOutput> {
        const podcast = await this.podcasts.findOne(id);
        if(podcast) {
            this.deletePodcast(id);
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
                    totalPages: Math.ceil(totalResults),
                }
            } catch {
                return {
                    ok: false,
                    error: "Could not search Podcasts",
                }
            }
    }

    async getAllEpisode({id: podcastId}: GetEpisodeInput): Promise<GetEpisodeOutput> {
        const {podcast} = await this.getPodcastOne(podcastId)
        const episodes = await this.episodes.find({
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

    async CreateEpisode({id, title, category}: CreateEpisodeInput): Promise<CreateEpisodeOutput> {

        try{
            const {podcast} = await this.getPodcastOne(id);
            const episode = await this.episodes.save(
                this.episodes.create({
                    title,
                    category,
                    podcast,
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

    async updateEpisode({id, ...rest}: UpdateEpisodeInput): Promise<UpdateEpisodeOutput> {
        try {
            const episode = await this.episodes.findOne(id);
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
    }
}