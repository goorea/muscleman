import 'react-native';
import React from 'react';
import SuccessModalScreen from '@src/screens/auth/SuccessModalScreen';
import { navigationMock } from '@mocks/navigationMocks';
import { render } from '@testing-library/react-native';
import { wrapper } from '@tests/functions';

describe('SuccessModalScreen 컴포넌트', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  const rendered = (
    type: '로그인' | '회원가입' = '로그인',
    userName: string = 'John',
  ) =>
    render(
      <SuccessModalScreen
        navigation={navigationMock}
        route={{
          key: '',
          name: 'SuccessModal',
          params: {
            type,
            userName,
          },
        }}
      />,
      { wrapper },
    );

  it('렌더링이 올바르게 된다', () => {
    const type = '로그인';
    const userName = 'John';
    const { queryByText } = rendered(type, userName);

    expect(queryByText(`${type} 완료!`)).not.toBeNull();
    expect(queryByText(`${userName}님,`)).not.toBeNull();
    expect(queryByText('환영합니다!')).not.toBeNull();
  });
});
