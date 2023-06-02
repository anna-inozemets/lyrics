import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './SongPage.scss';
import classNames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import { getSongInfo } from '../../api/getSongInfo';
import { SongPageInfo } from '../../types/SongPageInfo';
import { VideoComponent } from '../VideoComponent';
import { ThemeContext } from '../ThemeContext';
import { useLocalStorageArray } from '../../hooks/useLocalStorageArray';
import { Loader } from '../Loader';
import 'react-toastify/dist/ReactToastify.css';
import { PageNotFound } from '../PageNotFound';

export const SongPage = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { id } = useParams();
  const [songData, setSongData] = useState<SongPageInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isUkranianVideo, setIsUkranianVideo] = useState(false);
  const [, addItem] = useLocalStorageArray('songsId', []);

  const songId = id === undefined
    ? 0
    : +id;

  const customClass = classNames({
    'Toastify__toast-theme--dark': isDarkTheme,
  });

  const loadSongData = async () => {
    try {
      setIsLoading(true);
      const loadedSongData = await getSongInfo(songId);

      setSongData(loadedSongData);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    addItem(songId.toString());
    loadSongData();
  }, []);

  if (id?.toLowerCase() !== id?.toUpperCase()) {
    return (
      <PageNotFound />
    );
  }

  const youtubeInfo = songData?.media.filter(item => item.provider === 'youtube')[0] === undefined
    ? ''
    : songData?.media.filter(item => item.provider === 'youtube')[0].url;

  if (isError) {
    return (
      <p>
        Is error, sorry
      </p>
    );
  }

  const handleUkranianSong = () => {
    toast.info('Sorry, we can\'t find your song, but you can listen an amazing Ukranian song', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 10000,
      className: customClass,
    });
  };

  if (isUkranianVideo && !isLoading) {
    handleUkranianSong();
  }

  return (
    <div className="song-page__content">
      {isLoading ? (
        <div className="song-page__content-loader">
          <Loader />
        </div>
      ) : (
        <>
          <div className="song-page__content-additional">
            <ToastContainer />
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
          <VideoComponent videoUrl={youtubeInfo} setIsUkranianVideo={setIsUkranianVideo} />
        </>
      )}
    </div>
  );
};
