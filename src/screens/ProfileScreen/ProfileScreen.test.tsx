import { navigationMock } from '@mocks/navigationMocks';
import { render } from '@testing-library/react-native';
import React from 'react';

import { wrapper } from '@tests/functions';

import ProfileScreen from './index';

describe('ProfileScreen 컴포넌트', () => {
  const rendered = () =>
    render(
      <ProfileScreen
        navigation={navigationMock}
        route={{
          key: '',
          name: 'Profile',
        }}
      />,
      { wrapper },
    );

  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = rendered();

    expect(toJSON()).toMatchSnapshot();
  });
});
