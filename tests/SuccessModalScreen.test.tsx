import 'react-native';
import React from 'react';
import SuccessModalScreen from '@src/screens/auth/SuccessModalScreen';
import { navigationGoBackMock, navigationMock } from '@tests/mocks';
import { act, render } from '@testing-library/react-native';
import Sound from 'react-native-sound';
import ThemeProvider from '@src/contexts/ThemeProvider';

describe('SuccessModalScreen 컴포넌트', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  const rendered = (
    type: '로그인' | '회원가입' = '로그인',
    userName: string = 'John',
  ) =>
    render(
      <ThemeProvider>
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
        />
      </ThemeProvider>,
    );

  it('렌더링이 올바르게 된다', () => {
    const type = '로그인';
    const userName = 'John';
    const { queryByText } = rendered(type, userName);

    expect(queryByText(`${type} 완료!`)).not.toBeNull();
    expect(queryByText(`${userName}님,`)).not.toBeNull();
    expect(queryByText('환영합니다!')).not.toBeNull();
  });

  it('두개의 애니메이션과 하나의 알람이 재생된다', () => {
    rendered();

    expect(setTimeout).toHaveBeenCalledTimes(3);
  });

  it('알람은 0.5초 뒤에 재생된다', () => {
    rendered();

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);

    act(() => jest.advanceTimersByTime(500));
    expect(Sound.prototype.play).toHaveBeenCalled();
  });

  it('동그라미 애니메이션은 바로 실행된다', () => {
    rendered();

    expect(setTimeout).toHaveBeenNthCalledWith(2, expect.any(Function), 0);
  });

  it('체크 애니메이션은 0.4초 뒤에 실행된다', () => {
    rendered();

    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 400);
  });

  it('애니메이션을 끝낸 후에 뒤로 간다', () => {
    rendered();

    act(() => jest.advanceTimersByTime(400));
    expect(navigationGoBackMock).toHaveBeenCalled();
  });
});
