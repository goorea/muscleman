import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { plansState } from '@src/recoils';
import { Plan } from '@src/types/graphql';

const useDates = (): { completeDates: string[]; plannedDates: string[] } => {
  const plans = useRecoilValue<Plan[]>(plansState);

  return {
    completeDates: useMemo<string[]>(
      () => plans.filter(plan => plan.complete).map(plan => plan.plannedAt),
      [plans],
    ),
    plannedDates: useMemo<string[]>(
      () => plans.map(plan => plan.plannedAt),
      [plans],
    ),
  };
};

export default useDates;
