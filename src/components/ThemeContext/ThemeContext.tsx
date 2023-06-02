import React, { createContext, useState } from 'react';

export const ThemeContext = createContext({
  isDarkTheme: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toggleTheme: (value: boolean) => {},
});

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleTheme = (value: boolean) => {
    setIsDarkTheme(value);
    document.body.classList.toggle('dark');
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
