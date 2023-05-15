/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import './SearchScreen.scss';
import '../../utils/title.scss';
import { Loader } from '../Loader';
import { SearchForm } from '../SearchForm/SearchForm';
import { ThemeContext } from '../ThemeContext';
import { getSongsByArtist } from '../../api/getSongsByArtist';
import { SongsCards } from '../SongsCards';
import { PartSongInfo } from '../../types/PartSongInfo';

export const SearchScreen = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [songsData, setSongsData] = useState<PartSongInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const updateArtist = (updatedArtist: string) => {
    setArtist(updatedArtist);
  };

  const updateTitle = (updatedTitle: string) => {
    setTitle(updatedTitle);
  };

  const loadSongsData = async () => {
    try {
      setIsLoading(true);
      const loadedSongsData = await getSongsByArtist(artist, title);

      setSongsData(loadedSongsData);
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
    loadSongsData();
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
      <SongsCards songsData={songsData} />
    </div>
  );
};
