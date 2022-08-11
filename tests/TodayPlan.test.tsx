import { render } from '@testing-library/react-native';
import dayjs from 'dayjs';
import React from 'react';

import TodayPlan from '@src/components/TodayPlan';
import {
  Gender,
  Plan,
  TrainingCategory,
  TrainingType,
} from '@src/types/graphql';
import {
  planFactory,
  trainingFacotry,
  userFactory,
  volumeFactory,
  wrapper,
} from '@tests/functions';

describe('TodayPlan 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const plan: Plan = planFactory({
      plannedAt: dayjs().format('YYYY-MM-DD'),
      volumes: [],
      training: trainingFacotry({
        name: '바벨 백스쿼트',
        category: TrainingCategory.Weight,
        thumbnailPath: undefined,
        type: TrainingType.Lower,
      }),
      user: userFactory({
        email: 'john@example.com',
        gender: Gender.Male,
        name: '존시나',
        nickname: '레슬러',
      }),
    });
    plan.volumes = [...Array(5).keys()].map(() =>
      volumeFactory(plan, {
        weight: 90,
        count: 5,
        complete: false,
      }),
    );
    const { toJSON } = render(<TodayPlan plan={plan} />, { wrapper });

    expect(toJSON()).toMatchSnapshot();
  });
});
