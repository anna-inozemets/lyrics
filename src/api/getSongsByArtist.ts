import { Hit } from '../types/Hit';
import { FullInfoSong } from '../types/FullSongInfo';

export const getSongsByArtist = async (artist: string, songTitle: string) => {
  const accessToken = 'NDPGP460VWLWeXOUQcD59kdKD9AXc1DSqfjM8pA4O3cPfuPNW6lubQmzQxWcXPGC';
  const corsPolicy = 'https://corsproxy.io/?';
  const baseURL = 'https://api.genius.com';
  const searchUrl = `${artist.split(' ').join('%20')}%20${songTitle.split(' ').join('%20')}`;

  try {
    const response = await fetch(`${corsPolicy}${baseURL}/search?q=${searchUrl}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    const hits = await data.response.hits;
    const result = hits
      .map((hit: Hit) => hit.result)
      .map((songInfo: FullInfoSong) => {
        const {
          artist_names,
          id,
          song_art_image_thumbnail_url,
          title,
        } = songInfo;

        return {
          artist_names,
          id,
          song_art_image_thumbnail_url,
          title,
        };
      });

    return result;
  } catch (error) {
    return [];
  }
};
