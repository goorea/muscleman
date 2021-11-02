import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { RecoilRoot } from 'recoil';

import ThemeProvider from '@src/contexts/ThemeProvider';

export const wrapper: React.ComponentType<any> = ({ children }) => (
  <ThemeProvider>
    <RecoilRoot>
      <MockedProvider>{children}</MockedProvider>
    </RecoilRoot>
  </ThemeProvider>
);
