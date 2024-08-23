import React from 'react';
import { Slider, Switch } from "./themeSwitcher.ts";

const ThemeSwitcher: React.FC<{ themeMode: 'light' | 'dark'; toggleTheme: () => void }> = ({ themeMode, toggleTheme }) => {
  return (
    <Switch themeMode={themeMode}>
      <input type="checkbox" onChange={toggleTheme} />
      <Slider themeMode={themeMode} />
    </Switch>
  );
};

export default ThemeSwitcher;
