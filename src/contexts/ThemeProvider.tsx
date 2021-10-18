import React from 'react';
import theme from '@src/theme';
import { useColorScheme } from 'react-native';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { ThemeContextState } from '@src/types/theme';

export const ThemeContext = React.createContext<ThemeContextState>({
  dark: false,
  toggleTheme: () => null,
  colors: theme.light,
});

const ThemeProvider: React.FC = ({ children }) => {
  const dark = useColorScheme() === 'dark';
  const [themeState, setTheme] = React.useState<ThemeContextState>({
    dark,
    toggleTheme: () => {
      setTheme(prevState => ({
        dark: !prevState.dark,
        toggleTheme: prevState.toggleTheme,
        colors: prevState.dark ? theme.light : theme.dark,
      }));
    },
    colors: dark ? theme.dark : theme.light,
  });

  React.useEffect(() => {
    if (dark !== themeState.dark) {
      themeState.toggleTheme();
    }
  }, [dark, themeState]);

  return (
    <ThemeContext.Provider value={themeState}>
      <StyledThemeProvider theme={themeState.colors}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextState {
  return React.useContext<ThemeContextState>(ThemeContext);
}

export default ThemeProvider;
