import { navigationMock, navigationNavigateMock } from '@mocks/navigationMocks';
import { act, fireEvent, render } from '@testing-library/react-native';
import dayjs from 'dayjs';
import React from 'react';

import PlansScreen from '@src/screens/PlansScreen';
import { wrapper } from '@tests/functions';

describe('PlansScreen 컴포넌트', () => {
  const rendered = () =>
    render(
      <PlansScreen
        navigation={navigationMock}
        route={{
          key: '',
          name: 'Plans',
        }}
      />,
      { wrapper },
    );

  // TODO: PlanCalendar 오류 - DateSelectionCalendar 컴포넌트 View로 mock 등록 TypeError: Cannot read properties of undefined (reading 'bind')
  // it('렌더링이 올바르게 된다', () => {
  //   const { queryByText } = rendered();
  //
  //   expect(queryByText(dayjs().format('YYYY년 MMMM'))).not.toBeNull();
  //   expect(queryByText('오늘의 운동 계획하기')).not.toBeNull();
  // });

  it('오늘의 운동 계획하기 버튼을 누르면 EditPlan으로 이동한다', async () => {
    const { getByText } = rendered();

    await act(async () => fireEvent.press(getByText('오늘의 운동 계획하기')));

    expect(navigationNavigateMock).toHaveBeenCalledWith('Planning', {
      screen: 'EditPlan',
      params: {
        plannedAt: dayjs().format('YYYY-MM-DD'),
      },
    });
  });
});
