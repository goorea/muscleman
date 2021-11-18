import { navigationMock, navigationNavigateMock } from '@mocks/navigationMocks';
import { act, fireEvent, render } from '@testing-library/react-native';
import dayjs from 'dayjs';
import React from 'react';

import HomeCarousel from '@src/components/HomeCarousel';
import { wrapper } from '@tests/functions';

describe('HomeCarousel 컴포넌트', () => {
  const rendered = () =>
    render(<HomeCarousel navigation={navigationMock} />, {
      wrapper,
    });

  it('로그인 하지 않은 사용자도 렌더링이 올바르게 된다', () => {
    const { queryByText } = rendered();

    expect(queryByText('로그인 한 후에 확인할 수 있어요!')).not.toBeNull();
    expect(queryByText('로그인 하러가기')).not.toBeNull();
  });

  it('로그인 하지 않은 사용자가 로그인 하러가기 버튼을 누르면 이벤트가 발생한다', async () => {
    const { getByText } = rendered();

    await act(async () => fireEvent.press(getByText('로그인 하러가기')));

    expect(navigationNavigateMock).toHaveBeenCalledWith('Auth', {
      screen: 'Login',
    });
  });

  it('첫번째 아이템 렌더링이 올바르게 된다', () => {
    const { queryByText } = rendered();

    expect(queryByText('나의 3대 측정')).not.toBeNull();
    expect(queryByText(dayjs().format('YY`M.DD'))).not.toBeNull();
  });
});
