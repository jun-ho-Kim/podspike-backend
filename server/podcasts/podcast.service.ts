import { Injectable, NotFoundException } from "../../node_modules/@nestjs/common";
import { Podcast } from "./entity/podcast.entity";
import { Episode } from "./entity/episode.entity";
import { UpdatePodcastInput } from "./dto/update-podcast";
import { UpdateEpisodeInput, UpdateEpisodeOutput } from "./dto/update-episode";
import { GetPodcastInput, GetPodcastOutput } from "./dto/get-podcast";
import { CreateEpisodeInput, CreateEpisodeOutput } from "./dto/create-episode";
import { CoreOutput } from "./common/output.dto";
import {  EpisodeSearchInput } from "./dto/delete.dto";
import { CreatePodcastInput, CreatePodcastOutput } from "./dto/create-podcast.dto";
import { GetEpisodeInput, GetEpisodeOutput } from "./dto/get-episode";

@Injectable()
export class PodcastService {
    private podcasts: Podcast[] = [];
    private episodes: Episode[] = [];

    getHome(): Podcast[] {
        return this.podcasts;
    };

    createPodcast({title, category}: CreatePodcastInput): CreatePodcastOutput {
        this.podcasts.push({
            id: this.podcasts.length +1,
            title, 
            category
        });
        return {
            ok: true,
            podcast: this.podcasts[this.podcasts.length +1],
        }
    };

    getPodcastOne(id: number): GetPodcastOutput {
        const podcast = this.podcasts.find(podcast => podcast.id === +id);
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

    deletePodcast(id: number) {
        this.podcasts = this.podcasts.filter(podcasts => podcasts.id !== +id)
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

    updatePodcast({id, ...updateData}: UpdatePodcastInput) {
        const {podcast} = this.getPodcastOne(id);
        if(podcast) {
            this.deletePodcast(id);
            this.podcasts.push({...podcast ,...updateData})
            return {
                ok: true,
                error: null,
            };
        } else {
            return {
                ok: false,
                error: "Channel is Not Found"
            };
        }
    };

    getEpisode({id: podcastId}: GetEpisodeInput): GetEpisodeOutput {
        const {podcast, ok, error} = this.getPodcastOne(podcastId);
        if(!ok) {
            return {
                ok: false,
                error
            }
        }
        return {
            ok: true,
            episode: {...podcast.episodes},
        };
    };

    CreateEpisode({podcastId, ...rest}: CreateEpisodeInput): CreateEpisodeOutput {
        try{
            const {podcast} = this.getPodcastOne(podcastId)
            const newEpisode: Episode = {
                id: this.episodes.length +1,
                ...rest
            };
            this.updatePodcast({
                id: podcast.id,
                episodes: {...podcast.episodes, ...newEpisode},
            })
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

    deleteEpisode({id: podcastId, episodeId}: EpisodeSearchInput): CoreOutput {
        try {
            this.updatePodcast({
                id: podcastId,
                episodes: this.episodes.filter((episode) => episodeId !== episode.id)
            });
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

    updateEpisode({id, episodeId, ...rest}: UpdateEpisodeInput): UpdateEpisodeOutput {
        try {
            const {podcast, ok, error} = this.getPodcastOne(id);
            const episodeIndex = podcast.episodes.findIndex(({id}) => id === episodeId);
            const newEpisode = {...podcast.episodes[episodeIndex], ...rest}
            this.deleteEpisode({id, episodeId});
            this.updatePodcast({
                id,
                episodes: [...podcast.episodes, newEpisode]
            })
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