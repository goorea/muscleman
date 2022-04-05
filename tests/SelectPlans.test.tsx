import { act, fireEvent, render } from '@testing-library/react-native';
import dayjs from 'dayjs';
import React from 'react';

import { selectedPlans } from '@src/components/PreviousPlansModal/recoils';
import RecoilObserver from '@src/components/RecoilObserver';
import SelectPlans from '@src/components/SelectPlans';
import { planFactory, wrapper } from '@tests/functions';

describe('SelectPlans 컴포넌트', () => {
  const plannedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const plans = [...Array(3)].map(() => planFactory());
  const onChange = jest.fn();
  const rendered = () =>
    render(
      <>
        <RecoilObserver node={selectedPlans} onChange={onChange} />
        <SelectPlans plannedAt={plannedAt} plans={plans} />
      </>,
      { wrapper },
    );

  it('렌더링이 옹바르게 된다', () => {
    const { queryByText, queryByTestId, queryAllByTestId } = rendered();

    expect(
      queryByText(dayjs(plannedAt).format('YYYY년 MMMM D일 dddd')),
    ).not.toBeNull();
    expect(queryByTestId('toggleSelectButton')).not.toBeNull();
    expect(queryByTestId('toggleCollapseButton')).not.toBeNull();
    expect(queryAllByTestId('SelectPlan')).toHaveLength(plans.length);
  });

  it('선택을 토글 할 수 있다', async () => {
    const { getByTestId } = rendered();

    await act(
      async () => await fireEvent.press(getByTestId('toggleSelectButton')),
    );

    expect(onChange).toHaveBeenCalled();
  });
});
