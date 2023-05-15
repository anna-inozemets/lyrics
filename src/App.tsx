import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import classNames from 'classnames';
import './App.scss';
import { ThemeContext } from './components/ThemeContext';
import { MainScreen } from './components/MainScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { SearchScreen } from './components/SearchScreen';
import { PageNotFound } from './components/PageNotFound';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className={classNames('content', { dark: isDarkTheme })}>
      <div className={classNames('content__container', { dark: isDarkTheme })}>
        <Header />
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<MainScreen />} />
          <Route path="songs" element={<SearchScreen />} />
          <Route path="history" element={<HistoryScreen />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};
