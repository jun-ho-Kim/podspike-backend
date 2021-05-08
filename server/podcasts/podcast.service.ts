import { Injectable } from "../../node_modules/@nestjs/common";
import { Podcast } from "./entity/podcast.entity";
import { Episode } from "./entity/episode.entity";
import { UpdatePodcastInput, UpdatePodcastOutput } from "./dto/update-podcast";
import { UpdateEpisodeInput, UpdateEpisodeOutput } from "./dto/update-episode";
import { GetAllPodcastOutput, GetPodcastInput, GetPodcastOutput } from "./dto/get-podcast";
import { CreateEpisodeInput, CreateEpisodeOutput } from "./dto/create-episode";
import { CoreOutput } from "./common/output.dto";
import {  EpisodeSearchInput } from "./dto/delete.dto";
import { CreatePodcastInput, CreatePodcastOutput } from "./dto/create-podcast.dto";
import { GetEpisodeInput, GetEpisodeOutput } from "./dto/get-episode";

@Injectable()
export class PodcastService {
    private podcasts: Podcast[] = [];


    getAllPodcast(): GetAllPodcastOutput
     {
        return {
            ok: true,
            podcast: this.podcasts
        };
    };

    createPodcast({title, category}: CreatePodcastInput): CreatePodcastOutput {
        this.podcasts.push({
            id: this.podcasts.length +1,
            title, 
            category,
            rating: 0,
            episodes: [],
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
                podcast,
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

    updatePodcast({id, ...updateData}: UpdatePodcastInput): UpdatePodcastOutput {
        const {podcast} = this.getPodcastOne(id);
        if(podcast) {
            this.deletePodcast(id);
            this.podcasts.push({...podcast ,...updateData})
            return {
                ok: true,
                error: null,
                podcast: this.podcasts[id],
            };
        } else {
            return {
                ok: false,
                error: "Podcast is Not Found"
            };
        }
    };

    getAllEpisode({id: podcastId}: GetEpisodeInput): GetEpisodeOutput {
        const {podcast, ok, error} = this.getPodcastOne(podcastId);
        console.log("getAllEpisode", podcast.episodes)
        if(!ok) {
            return {
                ok: false,
                error
            }
        }
        return {
            ok: true,
            episode: podcast.episodes,
        };
    };

    CreateEpisode({podcastId, title, category}: CreateEpisodeInput): CreateEpisodeOutput {
        try{
            const {podcast} = this.getPodcastOne(podcastId);
            const newEpisode: Episode = {
                id: podcast.episodes.length +1,
                title,
                category,
            };
            this.updatePodcast({
                id: podcastId,
                episodes: [...podcast.episodes, newEpisode],
            })
            return {
                episode: podcast.episodes[podcast.episodes.length +1],
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
        const {podcast} = this.getPodcastOne(podcastId)
        try {
            this.updatePodcast({
                id: podcastId,
                episodes: podcast.episodes.filter((episode) => episode.id !== episodeId )
            });
            return {
                ok: true
            };
        } catch(error) {
            return { 
                ok: false,
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
            const {podcast: changePodcast} = this.getPodcastOne(id);
            this.updatePodcast({
                id,
                episodes: [...changePodcast.episodes, newEpisode]
            })
            return {
                ok: true,
                episode: podcast.episodes[episodeIndex],
            };
        } catch(error) {
            return {
                ok: true,

            }
        }
    };
}