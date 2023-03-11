import { useState, useEffect, createContext, useContext } from 'react';

const IS_SERVER = typeof window === 'undefined';

let storedTheme = IS_SERVER ? 'light' : localStorage.getItem('theme');

let defaultThemes = [
  { name: 'Light', icon: '☀️' },
  { name: 'Dark', icon: '🌙' },
  { name: 'Auto', icon: '⚙️' },
];

const ThemeContext = createContext(null);

//Modifies the html root element
function modifyDOM(theme) {
  if (
    theme === 'auto' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
}

export default function ThemeProvider({
  theme, // Overrides with this initial theme
  children,
  additionalThemes, //Themes that are merged with defaultThemes
  replaceThemes, //Themes that replace default themes (replaceThemes takes precedence if both replaceThemes and additionalThemes are specified)
}) {
  const [mode, setMode] = useState(getPreferredTheme());
  let themes = defaultThemes;
  if (additionalThemes) {
    themes = [...defaultThemes, ...additionalThemes];
  }
  if (replaceThemes) {
    themes = replaceThemes;
  }

  useEffect(() => {
    if (IS_SERVER) return;
    modifyDOM(mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getPreferredTheme() {
    if (theme) return theme;

    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function setTheme(theme) {
    modifyDOM(theme);
    localStorage.setItem('theme', theme);
    setMode(theme);
  }

  return (
    <ThemeContext.Provider value={{ theme: mode, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  // if `undefined`, throw an error
  if (!context) {
    throw new Error('useTheme() was used outside of its Provider');
  }
  return [context.theme, context.setTheme];
}

export function useThemeList() {
  const context = useContext(ThemeContext);

  // if `undefined`, throw an error
  if (!context) {
    throw new Error('useThemeList() was used outside of its Provider');
  }
  return context.themes;
}

export function LocalTheme({ theme, as: Tag = 'div', ...otherProps }) {
  return <Tag data-bs-theme={theme} {...otherProps} />;
}
