import React, { useContext } from 'react';
import './HistoryScreen.scss';
import classNames from 'classnames';
import { ThemeContext } from '../ThemeContext';

export const HistoryScreen = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className="search-screen__content">
      <h2 className={classNames('search-screen__title title', { dark: isDarkTheme })}>Search screen</h2>
    </div>
  );
};
