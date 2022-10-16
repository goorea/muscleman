import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { wrapper } from '@tests/functions';

import OneRMCalculatorModal from './index';

describe('OneRMCalculatorModal 컴포넌트', () => {
  const rendered = () => render(<OneRMCalculatorModal />, { wrapper });

  it('렌더링이 올바르게 된다', () => {
    const { toJSON } = rendered();

    expect(toJSON()).toMatchSnapshot();
  });

  it('중량과 횟수를 입력하면 1rm이 계산된다', async () => {
    const { getByTestId, queryByText } = rendered();
    const weight = 100;
    const count = 5;

    await act(async () => {
      fireEvent.changeText(getByTestId('weightField'), weight.toString());
      fireEvent.changeText(getByTestId('countField'), count.toString());
    });

    expect(
      queryByText(`1rm = ${weight + weight * count * 0.025}kg`),
    ).not.toBeNull();
  });
});
