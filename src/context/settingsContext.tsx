import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { selectSettings, updateSettings } from '../services';
import { setSettings } from '../utils';
import { Outlet } from 'react-router';

interface SettingsContextType {
  font: string;
  theme: string;
  handleSetFont: (font: string) => void;
  handleSetTheme: (theme: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = () => {
  const [font, setFont] = useState<string>('regular');
  const [theme, setTheme] = useState<string>('dark');

  const handleSetTheme = useCallback((theme: string) => {
    setTheme(theme || 'dark');
    updateSettings({theme, font})
      .then(() => setSettings({font, theme}));
  }, [updateSettings, font]);

  const handleSetFont = useCallback((font: string) => {
    setFont(font || 'regular');
    updateSettings({theme, font})
      .then(() => setSettings({font, theme}));
  }, [updateSettings, theme]);

  useEffect(() => {
    selectSettings()
      .then(({font, theme}) => {
        setFont(font || 'regular');
        setTheme(theme || 'dark');
        setSettings({font, theme});
      });
  }, []);

  return (
    <SettingsContext.Provider value={{ font, theme, handleSetTheme, handleSetFont }}>
      <Outlet />
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
};