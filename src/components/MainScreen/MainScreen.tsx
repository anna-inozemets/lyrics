import React, { useContext } from 'react';
import classNames from 'classnames';
import './MainScreen.scss';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

export const MainScreen:React.FC = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className="main-screen__content">
      <h1 className={classNames('main-screen__title', { dark: isDarkTheme })}>
        LyricQuest: Explore and Find Song Lyrics
      </h1>
      <div className="main-screen__link-wrapper">
        <NavLink to="/lyrics" className={classNames('main-screen__link-button', { dark: isDarkTheme })}>
          Lyrics
        </NavLink>
        <NavLink to="/history" className={classNames('main-screen__link-button', { dark: isDarkTheme })}>
          History
        </NavLink>
      </div>
    </div>
  );
};
