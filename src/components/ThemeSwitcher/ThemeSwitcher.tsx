/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useContext } from 'react';
import './ThemeSwitcher.scss';
import { ThemeContext } from '../ThemeContext';

export const ThemeSwitcher = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div className="switch__wrapper">
      <input
        className="switch__wrapper-input"
        id="switch"
        type="checkbox"
        onChange={event => {
          toggleTheme(event.target.checked);
        }}
      />
      <label htmlFor="switch" className="switch__wrapper-label"></label>
    </div>
  );
};
