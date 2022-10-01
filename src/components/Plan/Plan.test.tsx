import { render } from '@testing-library/react-native';
import React from 'react';

import Plan from '@src/components/Plan/index';
import { getTrainingTypeForKorean } from '@src/functions';
import { planFactory, volumeFactory, wrapper } from '@tests/functions';

describe('Plan 컴포넌트', () => {
  const plan = planFactory();
  const volume = volumeFactory(plan, {
    complete: false,
  });

  plan.volumes = [volume];
  const rendered = () => render(<Plan plan={plan} />, { wrapper });

  it('렌더링이 올바르게 된다', () => {
    const { queryByText } = rendered();

    expect(
      queryByText(
        `${getTrainingTypeForKorean(plan.training.type)} | ${
          plan.training.name
        } ${plan.volumes?.length}세트`,
      ),
    ).not.toBeNull();
  });
});
