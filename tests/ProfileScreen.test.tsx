import { navigationMock, navigationNavigateMock } from '@mocks/navigationMocks';
import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import ProfileScreen from '@src/screens/ProfileScreen';
import { wrapper } from '@tests/functions';

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

  it('로그인 하지 않은 사용자가 로그인 하러가기 버튼을 누를 수 있다', async () => {
    const { getByText } = rendered();

    await act(async () => fireEvent.press(getByText('로그인 하러가기')));

    expect(navigationNavigateMock).toHaveBeenCalledWith('Auth', {
      screen: 'Login',
    });
  });
});
