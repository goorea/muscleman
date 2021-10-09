import React from 'react';
import Navigation from '@src/navigations/Navigation';
import { ThemeProvider } from 'react-native-elements';
import theme from '@src/theme';
import { useColorScheme } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { client } from '@src/client';
import FlashMessage from '@src/components/FlashMessage';

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme} useDark={useColorScheme() === 'dark'}>
      <Navigation />
      <FlashMessage />
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
