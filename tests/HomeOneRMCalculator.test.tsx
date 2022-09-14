import { render } from '@testing-library/react-native';
import React from 'react';

import HomeOneRMCalculator from '@src/components/HomeOneRMCalculator';
import { wrapper } from '@tests/functions';

describe('HomeOneRMCalculator 컴포넌트', () => {
  const rendered = () => render(<HomeOneRMCalculator />, { wrapper });

  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = rendered();

    expect(toJSON()).toMatchSnapshot();
  });
});
