import { useState, useEffect } from 'react';
import { lightTheme, darkTheme } from './ThemeWrapper';

const usePersistentTheme = () => {
  const [theme, setTheme] = useState(() => {
    const localTheme = window.localStorage.getItem('appTheme');
    return localTheme === 'dark' ? darkTheme : lightTheme;
  });

  useEffect(() => {
    window.localStorage.setItem('appTheme', theme.palette.mode);
  }, [theme]);

  return [theme, setTheme];
};

export default usePersistentTheme;
