import { navigationMock } from '@mocks/navigationMocks';
import { render } from '@testing-library/react-native';
import React from 'react';

import RegisterUserScreen from '@src/screens/RegisterUserScreen';
import { wrapper } from '@tests/functions';

describe('RegisterUserScreen 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = render(
      <RegisterUserScreen
        navigation={navigationMock}
        route={{
          key: '',
          name: 'RegisterUser',
          params: {
            email: 'john@example.com',
            password: '123123123',
            passwordConfirmation: '123123123',
          },
        }}
      />,
      { wrapper },
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
