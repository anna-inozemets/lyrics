import React from 'react';
import './Header.scss';
import { HomeIcon } from '../HomeIcon';
import { BackLink } from '../BackLink';
import { ThemeSwitcher } from '../ThemeSwitcher';

export const Header: React.FC = () => (
  <header className="header">
    <div className="header__link-wrapper">
      <HomeIcon />
      <BackLink />
    </div>
    <ThemeSwitcher />
  </header>
);
