import { Injectable, NotFoundException } from "../../node_modules/@nestjs/common";
import { Podcast } from "./entity/podcast.entity";
import { Episode } from "./episode/episode.entity";
import { updatePodcastInput } from "./dto/update-podcast";
import { UpdateEpisodeInput } from "./dto/update-episode";
import { Repository } from "../../node_modules/typeorm";
import { CreatePodcastInput, CreatePodcastOutput } from "./dto/create-podcast.dto";
import { CoreOutput } from "./common/output.dto";
import { SearchOutput } from "./dto/search.dto";
import { InjectRepository } from "../../node_modules/@nestjs/typeorm";
import { CreateEpisodeInput } from "./dto/create-episode";

@Injectable()
export class PodcastService {
    constructor(
        @InjectRepository(Podcast)
        private readonly podcasts: Repository<Podcast>,
        @InjectRepository(Episode)
        private readonly episodes: Repository<Episode>
    ) {}

    getHome() {
        return this.podcasts.find();
    };

    createChannel(podcastData: CreatePodcastInput
    ): CreatePodcastOutput {
        this.podcasts.save(
            this.podcasts.create({
                ...podcastData
            })
        );
        return {
            ok: true,
            error: null,
        }
    };

    getPodcastOne(id: number): SearchOutput {
        const podcast = this.podcasts.findOne(id);
        if(!podcast) {
            return {
                ok: false,
                error: `Not Found Podcast ${id}`}
        }
        return {
            ok: true,
            error: null,
        };
    };

    deletePodcast(id: string) {
        this.podcasts.delete(id)
        try {
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

    updatePodcast(id: number, updateData: updatePodcastInput) {
        const podcast = this.getPodcastOne(id);
        if(podcast) {
            this.podcasts.update(id, { ...updateData})
            return {
                ok: true,
                error: null,
            };
        }
        return {
            ok: false,
            error: "Channel is Not Found"
        };
    };

    getEpisode(): CoreOutput {
        try{
            this.podcasts.find();
            return {
                ok: true,
                error: null,
            };
        } catch(error) {
            return {
                ok: false,
                error,
            }
        }
    };

    PostEpisode(episodeData: CreateEpisodeInput): CoreOutput
     {
        try{
            this.episodes.save(
                this.episodes.create({
                ...episodeData
                })
            )
            return {
                ok: true,
                error: null,
            };
        } catch(error) {
            return {
                ok: false,
                error,
            }
        }
    };

    deleteEpisode(id:string) {
        try {
            this.episodes.delete(id);
            return {
                ok: true
            };
        } catch(error) {
            return { 
                ok: true,
                error,
            }
        }
    };

    updateEpisode(id: string, episodeData: UpdateEpisodeInput) {
        try {
            this.episodes.update(id, {
                ...episodeData
            });
            return {
                ok: true
            };
        } catch(error) {
            return {
                ok: true,

            }
        }
    };
}