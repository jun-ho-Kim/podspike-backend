import { Injectable, NotFoundException } from "../../node_modules/@nestjs/common";
import { Podcast } from "./entity/podcast.entity";
import { Episode } from "./episode/episode.entity";
import { updatePodcastInput } from "./dto/update-podcast";
import { UpdateEpisodeInput } from "./dto/update-episode";

@Injectable()
export class PodcastService {
    private podcasts: Podcast[] = [];
    private episodes: Episode[] = [];

    getHome(): Podcast[] {
        return this.podcasts;
    };

    createChannel(podcastData: Podcast) {
        this.podcasts.push({
            id: this.podcasts.length +1,
            ... podcastData
        });
        return {
            ok: true,
            error: null,
        }
    };

    getPodcastOne(id: string): Podcast {
        const podcast = this.podcasts.find(podcast => podcast.id === +id);
        if(!podcast) {
            throw new NotFoundException(`podcast with ID: ${id} NOT FOUND`)
        }
        return podcast;
    };

    deletePodcast(id: string) {
        this.getPodcastOne(id);
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

    updatePodcast(id: string, updateData: updatePodcastInput) {
        const podcast = this.getPodcastOne(id);
        if(podcast) {
            this.deletePodcast(id);
            this.podcasts.push({...podcast, ...updateData})
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

    getEpisode(): Episode[] {
        return this.episodes;
    };

    PostEpisode(episodeData: Episode) {
        try{
            this.episodes.push({
                id: this.episodes.length +1,
                ...episodeData
            });
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
            this.episodes.filter(episodes => episodes.id === +id);
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
            this.deleteEpisode(id);
            this.episodes.push({
                id,
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