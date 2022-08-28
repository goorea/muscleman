import { act, fireEvent, render } from '@testing-library/react-native';
import dayjs from 'dayjs';
import React from 'react';

import TrainingModal from '@src/components/TrainingModal';
import {
  getTrainingCategoryForKorean,
  getTrainingTypeForKorean,
} from '@src/functions';
import { Training, TrainingCategory, TrainingType } from '@src/types/graphql';
import { wrapper } from '@tests/functions';

describe('TrainingModal 컴포넌트', () => {
  const training: Training = {
    _id: '1',
    category: TrainingCategory.Weight,
    createdAt: dayjs().toISOString(),
    description: '하체운동',
    name: '바벨 백스쿼트',
    preference: 1,
    type: TrainingType.Lower,
    updatedAt: dayjs().toISOString(),
  };
  const hide = jest.fn();
  const rendered = () =>
    render(<TrainingModal training={training} hide={hide} />, { wrapper });

  it('렌더링이 올바르게 된다', () => {
    const { queryByText } = rendered();

    expect(
      queryByText(
        `${getTrainingTypeForKorean(training.type)} | ${training.name}`,
      ),
    ).not.toBeNull();
    expect(
      queryByText(getTrainingCategoryForKorean(training.category)),
    ).not.toBeNull();
    expect(queryByText(training.description || '')).not.toBeNull();
  });

  it('Overlay와 CloseButton을 누르면 hide 리스너가 발생한다', async () => {
    const { getByTestId } = rendered();

    await act(async () => {
      await fireEvent.press(getByTestId('overlay'));
      await fireEvent.press(getByTestId('closeButton'));
    });

    expect(hide).toBeCalledTimes(2);
  });
});
