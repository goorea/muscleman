import React from 'react';
import Navigation from '@src/navigations/Navigation';
import { ThemeProvider } from 'react-native-elements';
import theme from '@src/theme';
import { useColorScheme } from 'react-native';

const App: React.FC = () => (
  <ThemeProvider theme={theme} useDark={useColorScheme() === 'dark'}>
    <Navigation />
  </ThemeProvider>
);

export default App;
