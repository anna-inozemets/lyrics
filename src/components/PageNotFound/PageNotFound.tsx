import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { ThemeContext } from '../ThemeContext';
import './PageNotFound.scss';

import Do from '../../music/Do.mp3';
import Re from '../../music/Re.mp3';
import Mi from '../../music/Mi.mp3';
import Fa from '../../music/Fa.mp3';
import Sol from '../../music/Sol.mp3';
import Lya from '../../music/Lya.mp3';
import Si from '../../music/Si.mp3';
import Do2 from '../../music/Do2.mp3';

import Dodiez from '../../music/Dodiez.mp3';
import Rediez from '../../music/Rediez.mp3';
import Fadiez from '../../music/Fadiez.mp3';
import Soldiez from '../../music/Soldiez.mp3';
import LyaDiez from '../../music/Lyadiez.mp3';

const mainSounds = [
  {
    button: 'A',
    file: Do,
  },
  {
    button: 'S',
    file: Re,
  },
  {
    button: 'D',
    file: Mi,
  },
  {
    button: 'F',
    file: Fa,
  },
  {
    button: 'G',
    file: Sol,
  },
  {
    button: 'H',
    file: Lya,
  },
  {
    button: 'J',
    file: Si,
  },
  {
    button: 'K',
    file: Do2,
  },
];
const additionalSounds = [
  {
    button: 'W',
    file: Dodiez,
  },
  {
    button: 'E',
    file: Rediez,
  },
  {
    button: 'T',
    file: Fadiez,
  },
  {
    button: 'Y',
    file: Soldiez,
  },
  {
    button: 'U',
    file: LyaDiez,
  },
];
const sounds = [...mainSounds, ...additionalSounds];

export const PageNotFound: React.FC = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [activeButton, setIsActiveButton] = useState('');

  const playSound = useCallback((fileValue: string) => {
    new Audio(fileValue).play();
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const currentLetter = event.key.toUpperCase();
    const currentSound = sounds.find(sound => sound.button === currentLetter);

    if (currentSound) {
      playSound(currentSound.file);
      setIsActiveButton(currentLetter);
    }
  }, [playSound]);

  const pianoButtonClick = (fileValue: string, buttonValue: string) => {
    playSound(fileValue);
    setIsActiveButton(buttonValue);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="page__not-found">
      <h2 className={classNames('title title--not-found-page', { dark: isDarkTheme })}>Some occured with your url, this page doesn&apos;t found &#x1F614;</h2>
      <div className="piano__container">
        <h3 className={classNames('title piano__container-title', { dark: isDarkTheme })}>
          But you can create your own music &#127925;
        </h3>
        <div className="piano">
          {mainSounds.map(mainSound => (
            <button
              key={mainSound.button}
              type="button"
              className={classNames('piano__button', { active: activeButton === mainSound.button })}
              onClick={() => pianoButtonClick(mainSound.file, mainSound.button)}
            >
              <p>{mainSound.button}</p>
            </button>
          ))}
          <div className="piano__additional-buttons">
            {additionalSounds.map(additionalSound => (
              <button
                key={additionalSound.button}
                type="button"
                className={classNames('piano__addition-button', { active: activeButton === additionalSound.button })}
                onClick={() => pianoButtonClick(additionalSound.file, additionalSound.button)}
              >
                <p>{additionalSound.button}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
