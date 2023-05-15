import { getSong } from 'genius-lyrics-api';
import { Song } from '../types/Song';

export const getSongByArtist = async (artist: string, title: string) => {
  const options = {
    apiKey: 'NDPGP460VWLWeXOUQcD59kdKD9AXc1DSqfjM8pA4O3cPfuPNW6lubQmzQxWcXPGC',
    title,
    artist,
    optimizeQuery: true,
  };

  try {
    const song: Song = await getSong(options);

    return song;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error:', error);

    return {
      id: 0,
      title: '',
      url: '',
      lyrics: '',
      albumArt: '',
    };
  }
};
