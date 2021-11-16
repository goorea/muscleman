import { navigationMock } from '@mocks/navigationMocks';
import { render } from '@testing-library/react-native';
import React from 'react';

import HomeScreen from '@src/screens/HomeScreen';
import { wrapper } from '@tests/functions';

describe('HomeScreen 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = render(
      <HomeScreen
        navigation={navigationMock}
        route={{
          key: '',
          name: 'Home',
        }}
      />,
      { wrapper },
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
