import { ApolloProvider } from '@apollo/client';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { RecoilRoot } from 'recoil';

import client from '@src/client';
import FlashMessage from '@src/components/FlashMessage';
import ThemeProvider from '@src/contexts/ThemeProvider';
import UserProvider from '@src/contexts/UserProvider';
import AppNavigator from '@src/navigations/AppNavigator';
import NavigationContainer from '@src/navigations/NavigationContainer';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
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
};

export default App;
