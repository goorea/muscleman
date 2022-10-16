import { render } from '@testing-library/react-native';
import React from 'react';

import {
  getTrainingCategoryForKorean,
  getTrainingTypeForKorean,
} from '@src/functions';
import { Training, TrainingCategory, TrainingType } from '@src/types/graphql';
import { trainingFacotry, wrapper } from '@tests/functions';
import TrainingModal from 'src/components/modals/TrainingModal/index';

describe('TrainingModal 컴포넌트', () => {
  const training: Training = trainingFacotry({
    category: TrainingCategory.Weight,
    description: '하체운동',
    name: '바벨 백스쿼트',
    type: TrainingType.Lower,
  });
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
});
