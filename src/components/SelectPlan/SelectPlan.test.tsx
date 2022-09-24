import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { selectedPlansState } from '@src/components/PreviousPlansModal/recoils';
import RecoilObserver from '@src/components/RecoilObserver';
import { TrainingType } from '@src/types/graphql';
import {
  planFactory,
  trainingFacotry,
  volumeFactory,
  wrapper,
} from '@tests/functions';

import SelectPlan from './index';

describe('SelectPlan 컴포넌트', () => {
  const plan = planFactory({
    training: trainingFacotry({
      type: TrainingType.Lower,
      name: '바벨 백스쿼트',
    }),
  });
  plan.volumes = [...Array(5)].map(() =>
    volumeFactory(plan, {
      weight: 100,
      count: 5,
    }),
  );
  const onChange = jest.fn();
  const rendered = () =>
    render(
      <>
        <RecoilObserver node={selectedPlansState} onChange={onChange} />
        <SelectPlan plan={plan} />
      </>,
      { wrapper },
    );

  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = rendered();

    expect(toJSON()).toMatchSnapshot();
  });

  it('선택을 토글 할 수 있다', async () => {
    const { getByTestId } = rendered();

    await act(async () => await fireEvent.press(getByTestId('toggleButton')));

    expect(onChange).toBeCalled();
  });
});
