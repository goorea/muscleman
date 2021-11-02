import { navigationMock, navigationNavigateMock } from '@mocks/navigationMocks';
import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import RegisterAccountScreen from '@src/screens/RegisterAccountScreen';
import { wrapper } from '@tests/functions';

describe('RegisterAccountScreen 컴포넌트', () => {
  const rendered = () =>
    render(
      <RegisterAccountScreen
        navigation={navigationMock}
        route={{
          key: '',
          name: 'RegisterAccount',
        }}
      />,
      { wrapper },
    );

  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = rendered();

    expect(toJSON()).toMatchSnapshot();
  });

  it('이메일 필드와 비밀번호 필드와 비밀번호 확인 필드와 다음 버튼이 보인다', () => {
    const { queryByTestId, queryByText } = rendered();

    expect(queryByTestId('emailField')).not.toBeNull();
    expect(queryByTestId('passwordField')).not.toBeNull();
    expect(queryByTestId('passwordConfirmationField')).not.toBeNull();
    expect(queryByText('다음')).not.toBeNull();
  });

  it('이메일 필드와 비밀번호 필드와 비밀번호 확인 필드를 비우고 다음 버튼을 누르면 에러 메세지들이 보인다', async () => {
    const { queryByText, getByText } = rendered();

    expect(queryByText('이메일을 입력해주세요')).toBeNull();
    expect(queryByText('비밀번호를 입력해주세요')).toBeNull();
    expect(queryByText('비밀번호 확인을 입력해주세요')).toBeNull();

    await act(async () => fireEvent.press(getByText('다음')));

    expect(queryByText('이메일을 입력해주세요')).not.toBeNull();
    expect(queryByText('비밀번호를 입력해주세요')).not.toBeNull();
    expect(queryByText('비밀번호 확인을 입력해주세요')).not.toBeNull();
  });

  it('이메일 필드는 이메일 형식이 아니라면 에러 메세지가 보인다', async () => {
    const { getByTestId, queryByText, getByText } = rendered();

    fireEvent.changeText(getByTestId('emailField'), 'Hello World');

    await act(async () => fireEvent.press(getByText('다음')));

    expect(queryByText('이메일 형식이 아닙니다')).not.toBeNull();
  });

  it('비밀번호 필드와 비밀번호 확인 필드는 8글자 이상이어야 한다', async () => {
    const { getByTestId, queryByText, getByText } = rendered();

    fireEvent.changeText(getByTestId('emailField'), 'john@example.com');
    fireEvent.changeText(getByTestId('passwordField'), 'a'.repeat(7));

    await act(async () => fireEvent.press(getByText('다음')));

    expect(queryByText('8글자보다 적습니다')).not.toBeNull();
  });

  it('올바른 값을 입력한 이후에는 RegisterUserScreen 페이지로 이동할 수 있다', async () => {
    const { getByTestId, getByText } = rendered();

    fireEvent.changeText(getByTestId('emailField'), 'john@example.com');
    fireEvent.changeText(getByTestId('passwordField'), 'a'.repeat(8));
    fireEvent.changeText(
      getByTestId('passwordConfirmationField'),
      'a'.repeat(8),
    );

    await act(async () => fireEvent.press(getByText('다음')));

    expect(navigationNavigateMock).toHaveBeenCalledWith(
      'RegisterUser',
      expect.anything(),
    );
  });
});
