import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { ThemeContext } from '../ThemeContext';
import './SongCard.scss';
import { PartSongInfo } from '../../types/PartSongInfo';

type Props = {
  songData: PartSongInfo,
};

export const SongCard: React.FC<Props> = ({ songData }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const {
    id,
    title,
    song_art_image_thumbnail_url,
    artist_names,
  } = songData;

  return (
    <div className={classNames('song__card', { dark: isDarkTheme })}>
      <img className="song__card__img" src={song_art_image_thumbnail_url} alt={title} />
      <h2 className={classNames('song__card__title', { dark: isDarkTheme })}>
        {artist_names}
      </h2>
      <h2 className={classNames('song__card__title', { dark: isDarkTheme })}>
        {title}
      </h2>
      <NavLink to={`/songs/${id}`} className={classNames('song__card__link', { dark: isDarkTheme })}>
        Get lyrics
      </NavLink>
    </div>
  );
};
