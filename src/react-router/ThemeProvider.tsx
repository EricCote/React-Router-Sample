import {
  useState,
  useEffect,
  createContext,
  useContext,
  ElementType,
  ReactNode,
} from 'react';

interface ThemeItem {
  name: string;
  icon: ElementType<any> | string;
}
interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  themes: ThemeItem[];
}

interface ThemeProviderProps {
  theme?: string;
  children: ReactNode;
  additionalThemes?: ThemeItem[];
  replaceThemes?: ThemeItem[];
}

interface LocalThemeProps {
  theme: string;
  as?: ElementType<any>;
  children: ReactNode;
  otherProps?: [];
}

const IS_SERVER: boolean = typeof window === 'undefined';

let storedTheme: string | null = IS_SERVER
  ? 'light'
  : localStorage.getItem('theme');

let defaultThemes: ThemeItem[] = [
  { name: 'Light', icon: '☀️' },
  { name: 'Dark', icon: '🌙' },
  { name: 'Auto', icon: '⚙️' },
];

const ThemeContext = createContext<ThemeContextType | null>(null);

//Modifies the html root element
function modifyDOM(theme: string) {
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
}: ThemeProviderProps) {
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

  function setTheme(theme: string) {
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

type ThemePair = [string, (theme: string) => void];

export function useTheme(): ThemePair {
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

export function LocalTheme({
  theme,
  as: Tag = 'div',
  children,
  ...otherProps
}: LocalThemeProps) {
  return (
    <Tag data-bs-theme={theme} {...otherProps}>
      {children}
    </Tag>
  );
}
