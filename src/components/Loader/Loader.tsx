import React, { useContext } from 'react';
import classNames from 'classnames';
import './Loader.scss';
import { ThemeContext } from '../ThemeContext';

export const Loader = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const loaderItems = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="loader__container">
      <div className="loader">
        {loaderItems.map((item) => (
          <div
            key={item}
            className={classNames(
              `loader__item loader__item--${item}`,
              { dark: isDarkTheme },
            )}
          >
          </div>
        ))}
      </div>
    </div>
  );
};
