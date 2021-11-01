import React from 'react';
import { render } from '@testing-library/react-native';
import RegisterUserScreen from '@src/screens/RegisterUserScreen';
import { wrapper } from '@tests/functions';
import { navigationMock } from '@mocks/navigationMocks';

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
            password_confirmation: '123123123',
          },
        }}
      />,
      { wrapper },
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
