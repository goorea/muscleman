import React from 'react';
import NavigationContainer from '@src/navigations/NavigationContainer';
import AppNavigator from '@src/navigations/AppNavigator';
import { ApolloProvider } from '@apollo/client';
import client from '@src/client';
import FlashMessage from '@src/components/FlashMessage';
import { RecoilRoot } from 'recoil';
import ThemeProvider from '@src/contexts/ThemeProvider';
import UserProvider from '@src/contexts/UserProvider';

const App: React.FC = () => (
  <ThemeProvider>
    <RecoilRoot>
      <ApolloProvider client={client}>
        <UserProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>

          <FlashMessage />
        </UserProvider>
      </ApolloProvider>
    </RecoilRoot>
  </ThemeProvider>
);

export default App;
