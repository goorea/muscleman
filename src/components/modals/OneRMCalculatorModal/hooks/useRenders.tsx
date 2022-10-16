import React from 'react';

import MaterialInput from '@src/components/MaterialInput';
import { RenderProps } from '@src/types/react-hook-form';
import { OneRMCalculatorFormInput } from 'src/components/modals/OneRMCalculatorModal/index';
import { InputWrapper } from 'src/components/modals/OneRMCalculatorModal/styled';

const useRenders = (): {
  weightRender: RenderProps<OneRMCalculatorFormInput, 'weight'>;
  countRender: RenderProps<OneRMCalculatorFormInput, 'count'>;
} => ({
  weightRender: ({ field }) => (
    <InputWrapper isFirst>
      <MaterialInput
        testID="weightField"
        {...field}
        label="들어올린 중량(kg)"
        autoFocus={true}
        keyboardType="number-pad"
      />
    </InputWrapper>
  ),
  countRender: ({ field }) => (
    <InputWrapper>
      <MaterialInput
        testID="countField"
        {...field}
        label="최대 반복 횟수"
        keyboardType="number-pad"
      />
    </InputWrapper>
  ),
});

export default useRenders;
