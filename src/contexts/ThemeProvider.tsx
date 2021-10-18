import React from 'react';
import theme from '@src/theme';
import {
  ThemeConsumer as ElementsThemeConsumer,
  ThemeProvider as ElementsThemeProvider,
} from 'react-native-elements';
import { useColorScheme } from 'react-native';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';

const ThemeProvider: React.FC = ({ children }) => {
  const useDark = useColorScheme() === 'dark';

  return (
    <ElementsThemeProvider theme={theme} useDark={useDark}>
      <ElementsThemeConsumer>
        {({ theme: { colors } }) =>
          colors ? (
            <StyledThemeProvider theme={colors}>{children}</StyledThemeProvider>
          ) : (
            children
          )
        }
      </ElementsThemeConsumer>
    </ElementsThemeProvider>
  );
};

export default ThemeProvider;
