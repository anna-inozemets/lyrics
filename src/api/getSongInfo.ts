import { SongPageInfo } from '../types/SongPageInfo';

export const getSongInfo = async (songId: number): Promise<SongPageInfo> => {
  const accessToken = 'NDPGP460VWLWeXOUQcD59kdKD9AXc1DSqfjM8pA4O3cPfuPNW6lubQmzQxWcXPGC';
  const corsPolicy = 'https://corsproxy.io/?';
  const baseURL = 'https://api.genius.com';

  try {
    const response = await fetch(`${corsPolicy}${baseURL}/songs/${songId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    const songInfo = await data.response.song;
    const {
      apple_music_player_url,
      artist_names,
      title,
      lyrics_state,
      song_art_image_thumbnail_url,
      header_image_thumbnail_url,
      release_date_for_display,
      media,
      url,
    } = songInfo;
    const resultValue = {
      apple_music_player_url: apple_music_player_url || '',
      artist_names: artist_names || '',
      title: title || '',
      lyrics_state: lyrics_state || false,
      song_art_image_thumbnail_url: song_art_image_thumbnail_url || '',
      header_image_thumbnail_url: header_image_thumbnail_url || '',
      release_date_for_display: release_date_for_display || '',
      media: media || [],
      url: url || '',
    };

    return resultValue;
  } catch (error) {
    return ({
      apple_music_player_url: '',
      artist_names: '',
      title: '',
      song_art_image_thumbnail_url: '',
      header_image_thumbnail_url: '',
      release_date_for_display: '',
      media: [],
      url: '',
    });
  }
};
