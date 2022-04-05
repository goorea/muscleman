import { atom } from 'recoil';

import { Plan } from '@src/types/graphql';

export const selectedPlans = atom<Plan[]>({
  key: 'selectedPlans',
  default: [],
});
