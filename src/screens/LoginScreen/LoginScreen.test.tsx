import 'react-native';
import { navigationMock, navigationNavigateMock } from '@mocks/navigationMocks';
import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { wrapper } from '@tests/functions';

import LoginScreen from './index';

describe('LoginScreen 컴포넌트', () => {
  const rendered = () =>
    render(
      <LoginScreen
        navigation={navigationMock}
        route={{
          key: '',
          name: 'Login',
        }}
      />,
      { wrapper },
    );

  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = rendered();

    expect(toJSON()).toMatchSnapshot();
  });

  it('이메일 필드와 비밀번호 필드와 로그인 버튼이 보인다', () => {
    const { queryByTestId, queryByText } = rendered();

    expect(queryByTestId('emailField')).not.toBeNull();
    expect(queryByTestId('passwordField')).not.toBeNull();
    expect(queryByText('로그인')).not.toBeNull();
  });

  it('이메일 필드와 비밀번호 필드를 비우고 로그인 버튼을 누르면 에러 메세지들이 보인다', async () => {
    const { queryByText, getByText } = rendered();

    expect(queryByText('이메일을 입력해주세요')).toBeNull();
    expect(queryByText('비밀번호를 입력해주세요')).toBeNull();

    await act(async () => fireEvent.press(getByText('로그인')));

    expect(queryByText('이메일을 입력해주세요')).not.toBeNull();
    expect(queryByText('비밀번호를 입력해주세요')).not.toBeNull();
  });

  it('이메일 필드는 이메일 형식이 아니라면 에러 메세지가 보인다', async () => {
    const { getByTestId, queryByText, getByText } = rendered();

    fireEvent.changeText(getByTestId('emailField'), 'Hello World');

    await act(async () => fireEvent.press(getByText('로그인')));

    expect(queryByText('이메일 형식이 아닙니다')).not.toBeNull();
  });

  it('비밀번호 필드는 8글자 이상이어야 한다', async () => {
    const { getByTestId, queryByText, getByText } = rendered();

    fireEvent.changeText(getByTestId('emailField'), 'john@example.com');
    fireEvent.changeText(getByTestId('passwordField'), 'a'.repeat(7));

    await act(async () => fireEvent.press(getByText('로그인')));

    expect(queryByText('8글자보다 적습니다')).not.toBeNull();
  });

  it('회원가입 페이지로 이동할 수 있다', async () => {
    const { getByTestId } = rendered();

    await act(async () => fireEvent.press(getByTestId('registerButton')));

    expect(navigationNavigateMock).toHaveBeenCalledWith('Register');
  });

  // TODO: 비밀번호찾기 페이지로 이동할 수 있다
});
