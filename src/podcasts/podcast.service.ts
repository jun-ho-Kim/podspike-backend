import { Injectable, NotFoundException } from "../../node_modules/@nestjs/common";
import { Podcast } from "./entity/podcast.entity";
import { Episode } from "./episode/episode.entity";

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
        })
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
    };

    updatePodcast(id: string, updateData: Podcast) {
        const podcast = this.getPodcastOne(id);
        this.deletePodcast(id);
        this.podcasts.push({...podcast, ...updateData})
    };

    getEpisode(): Episode[] {
        return this.episodes;
    };

    PostEpisode(episodeData: Episode) {
        this.episodes.push({
            id: this.episodes.length +1,
            ...episodeData
        })
    };

    deleteEpisode(id:string) {
        this.episodes.filter(episodes => episodes.id === +id);
    };

    updateEpisode(id: string, episodeData: Episode) {
        this.deleteEpisode(id);
        this.episodes.push({
            id,
            ...episodeData
        })
    };
}