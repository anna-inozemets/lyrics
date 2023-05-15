import React from 'react';
import './Header.scss';
import { HomeIcon } from '../HomeIcon';
import { ThemeSwitcher } from '../ThemeSwitcher';

export const Header = () => (
  <header className="header">
    <HomeIcon />
    <ThemeSwitcher />
  </header>
);
