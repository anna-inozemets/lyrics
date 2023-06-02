import React, { useContext } from 'react';
import './NoInfo.scss';
import classNames from 'classnames';
import { ThemeContext } from '../ThemeContext';
import EmptySearchImage from '../../images/empty__search.png';

export const NoInfo:React.FC = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className="no-info__wrapper">
      <h2 className={classNames('title', { dark: isDarkTheme })}>
        Sorry &#x1F614; We can find information for your request
      </h2>
      <img src={EmptySearchImage} alt="Empty search" />
    </div>
  );
};
