import { atom } from 'recoil';

import { Plan } from '@src/types/graphql';

export const selectedPlansState = atom<Plan[]>({
  key: 'selectedPlansState',
  default: [],
});
