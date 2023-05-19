/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './SongPage.scss';
import classNames from 'classnames';
import { getSongInfo } from '../../api/getSongInfo';
import { SongPageInfo } from '../../types/SongPageInfo';
import { VideoComponent } from '../VideoComponent';
import { ThemeContext } from '../ThemeContext';

export const SongPage = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { id } = useParams();
  const [songData, setSongData] = useState<SongPageInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const songId = id === undefined
    ? 0
    : +id;

  const loadSongData = async () => {
    try {
      setIsLoading(true);
      const loadedSongData = await getSongInfo(songId);

      // eslint-disable-next-line no-console
      console.log(loadedSongData);

      setSongData(loadedSongData);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSongData();
  }, []);

  //     lyrics_state: false,
  const youtubeInfo = songData?.media.filter(item => item.provider === 'youtube')[0].url || '';

  return (
    <div className="song-page__content">
      <div className="song-page__content-additional">
        <div className="song-page__content-additional-photo-wrapper">
          <img src={songData?.header_image_thumbnail_url} alt={songData?.title} />
          <img src={songData?.song_art_image_thumbnail_url} alt={songData?.title} />
        </div>
        <div className={classNames('song-page__content-text', { dark: isDarkTheme })}>
          <h2>{songData?.title}</h2>
          <h3>{songData?.artist_names}</h3>
          <p>
            <strong>
              Release date:
            </strong>
            {songData?.release_date_for_display}
          </p>
          <a
            href={songData?.apple_music_player_url}
            target="_blank"
            rel="noreferrer"
            className={classNames({ dark: isDarkTheme })}
          >
            Apple music link
          </a>
          <a
            href={songData?.url}
            target="_blank"
            rel="noreferrer"
            className={classNames({ dark: isDarkTheme })}
          >
            Lyrics link
          </a>
        </div>
      </div>
      <VideoComponent videoUrl={youtubeInfo} />
    </div>
  );
};
