import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { RecoilRoot } from 'recoil';

import '@src/plugins/dayjs';
import client from '@src/client';
import FlashMessage from '@src/components/FlashMessage';
import RecoilProvider from '@src/contexts/RecoilProvider';
import ThemeProvider from '@src/contexts/ThemeProvider';
import AppNavigator from '@src/navigations/AppNavigator';
import NavigationContainer from '@src/navigations/NavigationContainer';

const App: React.FC = () => (
  <ThemeProvider>
    <RecoilRoot>
      <ApolloProvider client={client}>
        <RecoilProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>

          <FlashMessage />
        </RecoilProvider>
      </ApolloProvider>
    </RecoilRoot>
  </ThemeProvider>
);

export default App;
