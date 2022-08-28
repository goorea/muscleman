import { MockedProvider } from '@apollo/client/testing';
import { navigationMock, navigationNavigateMock } from '@mocks/navigationMocks';
import {
  act,
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import dayjs from 'dayjs';
import React from 'react';

import { getTrainingTypeForKorean } from '@src/functions';
import { TRAININGS } from '@src/operations/queries/trainings';
import AddTrainingScreen from '@src/screens/AddTrainingScreen';
import { TrainingCategory, TrainingType } from '@src/types/graphql';
import { trainingFacotry, wrapper } from '@tests/functions';

describe('AddTrainingScreen 컴포넌트 테스트', () => {
  const mockTraining = trainingFacotry({
    category: TrainingCategory.Weight,
    description: '하체운동',
    name: '바벨 백스쿼트',
    type: TrainingType.Lower,
  });
  const mocks = {
    request: {
      query: TRAININGS,
    },
    result: {
      data: {
        trainings: [mockTraining],
      },
    },
  };
  const plannedAt = dayjs().toISOString();
  const rendered = () =>
    render(
      <MockedProvider mocks={[mocks]}>
        <AddTrainingScreen
          navigation={navigationMock}
          route={{
            key: '',
            name: 'AddTraining',
            params: { plannedAt },
          }}
        />
      </MockedProvider>,
      { wrapper },
    );

  it('최초 진입시 로딩 중이다', () => {
    const { queryByTestId } = rendered();

    expect(queryByTestId('loader')).not.toBeNull();
  });

  it('렌더링이 올바르게 된다', async () => {
    const { getByTestId, queryByText } = rendered();

    await waitForElementToBeRemoved(() => getByTestId('loader'));

    expect(
      queryByText(getTrainingTypeForKorean(mockTraining.type)),
    ).not.toBeNull();
    expect(queryByText(mockTraining.name)).not.toBeNull();
    expect(queryByText('운동 추가하기 (0)')).not.toBeNull();
  });

  it('운동 종목을 누르면 토글된다', async () => {
    const { getByTestId, queryByText, getByText } = rendered();

    await waitForElementToBeRemoved(() => getByTestId('loader'));

    expect(queryByText('운동 추가하기 (0)')).not.toBeNull();

    await act(async () => fireEvent.press(getByText(mockTraining.name)));

    expect(queryByText('운동 추가하기 (1)')).not.toBeNull();

    await act(async () => fireEvent.press(getByText(mockTraining.name)));

    expect(queryByText('운동 추가하기 (0)')).not.toBeNull();
  });

  it('선택한 운동 종목이 없다면 운동을 추가할 수 없다', async () => {
    const { getByTestId, getByText } = rendered();

    await waitForElementToBeRemoved(() => getByTestId('loader'));

    expect(getByText('운동 추가하기 (0)')).toBeDefined();
  });

  it('운동 종목의 infoButton을 누르면 TrainingModal이 보인다', async () => {
    const { getByTestId, queryByTestId } = rendered();

    await waitForElementToBeRemoved(() => getByTestId('loader'));

    await act(async () => fireEvent.press(getByTestId('infoButton')));

    expect(queryByTestId('trainingModal')).not.toBeNull();
  });

  it('운동 종목을 선택하고 운동 추가하기 버튼을 누르면 EditPlan 스크린으로 navigate 된다', async () => {
    const { getByTestId, getByText } = rendered();

    await waitForElementToBeRemoved(() => getByTestId('loader'));

    await act(async () => fireEvent.press(getByText(mockTraining.name)));

    await act(async () => fireEvent.press(getByText('운동 추가하기 (1)')));

    expect(navigationNavigateMock).toBeCalledWith('EditPlan', {
      plannedAt,
      trainings: [mockTraining],
    });
  });
});
