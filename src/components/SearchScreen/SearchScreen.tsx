import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import './SearchScreen.scss';
import '../../utils/title.scss';
import { Song } from '../../types/Song';
import { Loader } from '../Loader';
import { SearchForm } from '../SearchForm/SearchForm';
import { ThemeContext } from '../ThemeContext';
import { getSongByArtist } from '../../api/getSongByArtist';
import { SongInfo } from '../SongInfo';

export const SearchScreen = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [songData, setSongData] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const updateArtist = (updatedArtist: string) => {
    setArtist(updatedArtist);
  };

  const updateTitle = (updatedTitle: string) => {
    setTitle(updatedTitle);
  };

  const loadSongData = async () => {
    try {
      setIsLoading(true);
      const loadedSongData = await getSongByArtist(artist, title);

      setSongData(loadedSongData);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setArtist('');
    setTitle('');
    loadSongData();
  };

  return (
    <div className="search-screen__content">
      <h2 className={classNames('search-screen__title title', { dark: isDarkTheme })}>Search screen</h2>
      <SearchForm
        artist={artist}
        updateArtist={updateArtist}
        title={title}
        updateTitle={updateTitle}
        handleSearch={handleSearch}
      />
      {isLoading && (
        <Loader />
      )}
      {isError && (
        <p>
          Error occured
        </p>
      )}
      {songData && (
        <SongInfo songData={songData} />
      )}
    </div>
  );
};
