import { render } from '@testing-library/react-native';
import React from 'react';

import { getTrainingTypeForKorean } from '@src/functions';
import { EditingPlan } from '@src/types';
import { planFactory, wrapper } from '@tests/functions';

import EditPlan from './index';

describe('EditPlan 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const editingPlan = planFactory();
    const drag = jest.fn();

    const { queryByText, queryByTestId } = render(
      <EditPlan editingPlan={editingPlan as EditingPlan} drag={drag} />,
      {
        wrapper,
      },
    );

    expect(queryByTestId('dragButton')).not.toBeNull();
    expect(queryByTestId('toggleButton')).not.toBeNull();
    expect(queryByTestId('deleteButton')).not.toBeNull();
    expect(queryByTestId('addVolumeButton')).not.toBeNull();

    expect(
      queryByText(
        `${getTrainingTypeForKorean(editingPlan.training.type)} | ${
          editingPlan.training.name
        }`,
      ),
    ).not.toBeNull();
  });
});
