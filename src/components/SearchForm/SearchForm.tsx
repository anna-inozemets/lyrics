/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useState,
  useContext,
  useEffect,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';
import { ThemeContext } from '../ThemeContext';
import './SearchForm.scss';

type Props = {
  handleSearch: () => void,
};

export const SearchForm: React.FC<Props> = ({
  handleSearch,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [isArtistNameFocused, setIsArtistNameFocused] = useState(false);
  const [isSongTitleFocused, setIsSongTitleFocused] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const artist = searchParams.get('artist') || '';
  const title = searchParams.get('title') || '';

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const currentValue = event.target.value.trimStart() || null;

    setSearchParams(
      getSearchWith(
        searchParams,
        { [field]: currentValue },
      ),
    );
  };

  const clearInput = (field: string) => {
    if (field === 'artist') {
      setIsArtistNameFocused(false);
    }

    if (field === 'title') {
      setIsSongTitleFocused(false);
    }

    setSearchParams(
      getSearchWith(
        searchParams,
        { [field]: null },
      ),
    );
  };

  const handleFocus = (setIsInputFocused:(value: boolean) => void) => {
    setIsInputFocused(true);
  };

  const handleBlur = (setIsInputFocused:(value: boolean) => void, value: string) => {
    if (value.length > 0) {
      setIsInputFocused(true);
    } else {
      setIsInputFocused(false);
    }
  };

  useEffect(() => {
    if (artist && artist.length !== 0) {
      setIsArtistNameFocused(true);
    }

    if (title && title.length !== 0) {
      setIsSongTitleFocused(true);
    }
  }, [artist, title]);

  const isClearArtistButtonVisible = artist.length !== 0 && artist !== null;
  const isClearTitleButtonVisible = title.length !== 0 && title !== null;

  return (
    <form className="form">
      <div className="form__input-wrapper">
        <label
          htmlFor="artistName"
          className={classNames(
            'form__label',
            { 'form__label--focused': isArtistNameFocused },
            { dark: isDarkTheme },
          )}
        >
          Artist name
        </label>
        <input
          className={classNames('form__input', { dark: isDarkTheme })}
          type="text"
          id="artistName"
          value={artist}
          onChange={(event) => handleInput(event, 'artist')}
          onFocus={() => handleFocus(setIsArtistNameFocused)}
          onBlur={() => handleBlur(setIsArtistNameFocused, artist)}
        />
        {isClearArtistButtonVisible && (
          <button
            type="button"
            className={classNames('clear-input-button', { dark: isDarkTheme })}
            onClick={() => clearInput('artist')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M5 5 L19 19 M5 19 L19 5" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        )}
      </div>
      <div className="form__input-wrapper">
        <label
          htmlFor="songTitle"
          className={classNames(
            'form__label',
            { 'form__label--focused': isSongTitleFocused },
            { dark: isDarkTheme },
          )}
        >
          Song title
        </label>
        <input
          className={classNames('form__input', { dark: isDarkTheme })}
          type="text"
          value={title}
          id="songTitle"
          onChange={(event) => handleInput(event, 'title')}
          onFocus={() => handleFocus(setIsSongTitleFocused)}
          onBlur={() => handleBlur(setIsSongTitleFocused, title)}
        />
        {isClearTitleButtonVisible && (
          <button
            type="button"
            className={classNames('clear-input-button', { dark: isDarkTheme })}
            onClick={() => clearInput('title')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M5 5 L19 19 M5 19 L19 5" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        )}
      </div>
      <button
        className={classNames('form__button', { dark: isDarkTheme })}
        type="button"
        onClick={handleSearch}
      >
        Search
      </button>
    </form>
  );
};
