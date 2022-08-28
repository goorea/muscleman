import 'react-native';
import { act } from '@testing-library/react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import App from '@src/App';

describe('App 컴포넌트', () => {
  it('렌더링이 올바르게 된다', async () => {
    await act(async () => renderer.create(<App />));
  });
});
