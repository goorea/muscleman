import { act, fireEvent, render } from '@testing-library/react-native';
import dayjs from 'dayjs';
import React from 'react';

import { wrapper } from '@tests/functions';

import PreviousPlansModal from './index';

describe('PreviousPlansModal 컴포넌트', () => {
  const plannedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const onLoad = jest.fn();
  const rendered = () =>
    render(<PreviousPlansModal plannedAt={plannedAt} onLoad={onLoad} />, {
      wrapper,
    });

  it('렌더링이 올바르게 된다', () => {
    const { queryByText } = rendered();

    expect(queryByText('이전 계획 불러오기')).not.toBeNull();
    expect(queryByText('불러오기')).not.toBeNull();
  });

  it('불러오기 버튼을 누르면 onLoad가 실행된다', async () => {
    const { getByText } = rendered();

    await act(async () => await fireEvent.press(getByText('불러오기')));

    expect(onLoad).toHaveBeenCalled();
  });
});
