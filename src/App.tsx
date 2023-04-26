import React, { useContext } from 'react';
import classNames from 'classnames';
import './App.scss';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { ThemeContext } from './components/ThemeContext';

export const App: React.FC = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className={classNames('starter', { dark: isDarkTheme })}>
      <ThemeSwitcher />
    </div>
  );
};
