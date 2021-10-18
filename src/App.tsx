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
  <RecoilRoot>
    <React.Suspense fallback={<Loader />}>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>

          <FlashMessage />
        </ThemeProvider>
      </ApolloProvider>
    </React.Suspense>
  </RecoilRoot>
);

export default App;
