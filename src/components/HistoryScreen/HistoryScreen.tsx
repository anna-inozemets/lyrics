import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import './HistoryScreen.scss';
import classNames from 'classnames';
import { ThemeContext } from '../ThemeContext';
import { useLocalStorageArray } from '../../hooks/useLocalStorageArray';
import { getSongInfo } from '../../api/getSongInfo';
import { PartSongInfo } from '../../types/PartSongInfo';
import { SongsCards } from '../SongsCards';
import { Loader } from '../Loader';

export const HistoryScreen = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [songsData, setSongsData] = useState<PartSongInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, , , clearItems] = useLocalStorageArray('songsId', []);

  useEffect(() => {
    const loadSongData = async () => {
      try {
        setIsLoading(true);
        const loadedSongsData = await Promise.all(data.map(async (dataId: string) => {
          return getSongInfo(+dataId);
        }));
        const normalizedSongsData = loadedSongsData
          .map((loadedSongData, index) => {
            const {
              artist_names,
              title,
              song_art_image_thumbnail_url,
            } = loadedSongData;

            return {
              artist_names,
              title,
              song_art_image_thumbnail_url,
              id: +data[index],
            };
          })
          .reverse();

        setSongsData(normalizedSongsData);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadSongData();
  }, []);

  const handleClearHistory = useCallback(() => {
    clearItems();
    setSongsData([]);
  }, []);

  if (isError) {
    return (
      <p>
        Is error!
      </p>
    );
  }

  return (
    <div className="history-screen__content">
      {isLoading ? (
        <div className="history-screen__content-loader">
          <Loader />
        </div>
      ) : (
        <>
          <h2 className={classNames('search-screen__title title', { dark: isDarkTheme })}>
            {songsData.length === 0
              ? 'Your history is empty'
              : 'History'}
          </h2>
          {songsData.length !== 0 && (
            <>
              <button
                type="button"
                onClick={handleClearHistory}
                className={classNames({ dark: isDarkTheme })}
              >
                Clear History
              </button>
              <SongsCards songsData={songsData} />
            </>
          )}
        </>
      )}
    </div>
  );
};
