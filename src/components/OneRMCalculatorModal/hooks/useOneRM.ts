import { useMemo } from 'react';
import { UseFormWatch } from 'react-hook-form/dist/types/form';

import { OneRMCalculatorFormInput } from '@src/components/OneRMCalculatorModal';

const useOneRM = (watch: UseFormWatch<OneRMCalculatorFormInput>) => {
  const weight = Number(watch('weight'));
  const count = Number(watch('count'));

  return {
    oneRM: useMemo(
      () => (weight && count ? weight + weight * count * 0.025 : 0),
      [count, weight],
    ),
  };
};

export default useOneRM;
