import * as React from 'react';
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing';
import ThemeProvider from '@src/contexts/ThemeProvider';

export const wrapper: React.ComponentType<any> = ({ children }) => (
  <ThemeProvider>
    <RecoilRoot>
      <MockedProvider>{children}</MockedProvider>
    </RecoilRoot>
  </ThemeProvider>
);
