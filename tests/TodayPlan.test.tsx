import { render } from '@testing-library/react-native';
import moment from 'moment';
import React from 'react';

import TodayPlan from '@src/components/TodayPlan';
import {
  Gender,
  Plan,
  TrainingCategory,
  TrainingType,
} from '@src/types/graphql';
import { wrapper } from '@tests/functions';

describe('TodayPlan 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const plan: Plan = {
      _id: '1',
      complete: false,
      plannedAt: moment().format('YYYY-MM-DD'),
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      volumes: [],
      training: {
        _id: '1',
        name: '바벨 백스쿼트',
        category: TrainingCategory.Weight,
        thumbnailPath: undefined,
        type: TrainingType.Lower,
        createdAt: moment().toISOString(),
        updatedAt: moment().toISOString(),
      },
      user: {
        _id: '1',
        email: 'john@example.com',
        gender: Gender.Male,
        name: '존시나',
        nickname: '레슬러',
        createdAt: moment().toISOString(),
        updatedAt: moment().toISOString(),
      },
    };
    plan.volumes = [...Array(5).keys()].map(i => ({
      _id: String(i + 1),
      plan,
      weight: 90,
      count: 5,
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
    }));
    const { toJSON } = render(<TodayPlan plan={plan} />, { wrapper });

    expect(toJSON()).toMatchSnapshot();
  });
});
