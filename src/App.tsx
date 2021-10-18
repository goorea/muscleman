import React from 'react';
import NavigationContainer from '@src/navigations/NavigationContainer';
import AppNavigator from '@src/navigations/AppNavigator';
import { ApolloProvider } from '@apollo/client';
import client from '@src/client';
import FlashMessage from '@src/components/FlashMessage';
import { RecoilRoot } from 'recoil';
import Loader from '@src/components/Loader';
import ThemeProvider from '@src/contexts/ThemeProvider';

const App: React.FC = () => (
  <ThemeProvider>
    <RecoilRoot>
      <React.Suspense fallback={<Loader />}>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>

          <FlashMessage />
        </ApolloProvider>
      </React.Suspense>
    </RecoilRoot>
  </ThemeProvider>
);

export default App;
