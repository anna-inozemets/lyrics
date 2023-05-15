/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState, useContext } from 'react';
import classNames from 'classnames';
import { ThemeContext } from '../ThemeContext';
import './SearchForm.scss';

type Props = {
  artist: string,
  updateArtist: (value: string) => void,
  title: string,
  updateTitle: (value: string) => void,
  handleSearch: () => void,
};

export const SearchForm: React.FC<Props> = ({
  artist,
  updateArtist,
  title,
  updateTitle,
  handleSearch,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [isArtistNameFocused, setIsArtistNameFocused] = useState(false);
  const [isSongTitleFocused, setIsSongTitleFocused] = useState(false);

  const updateValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, setValue: (value: string) => void) => {
      setValue(event.target.value);
    },
    [artist, title],
  );

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
          onChange={(event) => updateValue(event, updateArtist)}
          onFocus={() => handleFocus(setIsArtistNameFocused)}
          onBlur={() => handleBlur(setIsArtistNameFocused, artist)}
        />
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
          onChange={(event) => updateValue(event, updateTitle)}
          onFocus={() => handleFocus(setIsSongTitleFocused)}
          onBlur={() => handleBlur(setIsSongTitleFocused, title)}
        />
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
