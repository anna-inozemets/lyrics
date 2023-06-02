import { Media } from './Media';

export type SongPageInfo = {
  apple_music_player_url: string,
  artist_names: string,
  title: string,
  song_art_image_thumbnail_url: string,
  header_image_thumbnail_url: string,
  release_date_for_display: string,
  media: Media[],
  url: string,
};
