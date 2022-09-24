import { navigationMock } from '@mocks/navigationMocks';
import { render } from '@testing-library/react-native';
import dayjs from 'dayjs';
import React from 'react';

import { wrapper } from '@tests/functions';

import EditPlanScreen from './index';

describe('EditPlanScreen 컴포넌트', () => {
  const plannedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const rendered = () =>
    render(
      <EditPlanScreen
        navigation={navigationMock}
        route={{
          key: '',
          name: 'EditPlan',
          params: {
            plannedAt,
          },
        }}
      />,
      {
        wrapper,
      },
    );

  it('렌더링이 올바르게 된다', () => {
    const { queryByText, queryByTestId } = rendered();

    expect(queryByText('이전 계획 불러오기')).not.toBeNull();
    expect(queryByText('운동 추가')).not.toBeNull();
    expect(queryByTestId('submitButton')).not.toBeNull();
  });
});
