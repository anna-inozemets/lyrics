import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import './SearchScreen.scss';
import '../../utils/title.scss';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Loader } from '../Loader';
import { SearchForm } from '../SearchForm/SearchForm';
import { ThemeContext } from '../ThemeContext';
import { getSongsByArtist } from '../../api/getSongsByArtist';
import { SongsCards } from '../SongsCards';
import { PartSongInfo } from '../../types/PartSongInfo';
import { NoInfo } from '../NoInfo';

export const SearchScreen: React.FC = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const [songsData, setSongsData] = useState<PartSongInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const artist = searchParams.get('artist') || '';
  const title = searchParams.get('title') || '';

  const loadSongsData = async () => {
    try {
      setHasLoaded(false);
      setIsLoading(true);
      const loadedSongsData = await getSongsByArtist(artist, title);

      setSongsData(loadedSongsData);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    } finally {
      setIsLoading(false);
      setHasLoaded(true);
    }
  };

  useEffect(() => {
    if (artist.length !== 0 || title.length !== 0) {
      loadSongsData();
    }
  }, []);

  const handleSearchButton = useCallback(() => {
    setSongsData([]);
    loadSongsData();
  }, []);

  const customClass = classNames({
    'Toastify__toast-theme--dark': isDarkTheme,
  });

  const handleSearch = () => {
    const emptyArtist = artist === null || artist.length === 0;
    const emptyTitle = title === null || title.length === 0;

    if (emptyArtist && emptyTitle) {
      toast.info('You can\'t search for empty song title and artist. Please type at least one of them', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 10000,
        className: customClass,
      });
    } else {
      handleSearchButton();
    }
  };

  const noInfoWasFounded = songsData.length === 0 && hasLoaded;

  return (
    <div className="search-screen__content">
      <ToastContainer />
      <h2 className={classNames('search-screen__title title', { dark: isDarkTheme })}>Search screen</h2>
      <SearchForm
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
      {noInfoWasFounded && (
        <NoInfo />
      )}
      <SongsCards songsData={songsData} />
    </div>
  );
};
