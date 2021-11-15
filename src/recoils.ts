import { atom } from 'recoil';

import { SBDOneRM } from '@src/operations/queries/getOneRM';
import { User } from '@src/types/graphql';

export const userState = atom<User | undefined>({
  key: 'user',
  default: undefined,
});

export const SBDOneRMState = atom<SBDOneRM>({
  key: 'SBDOneRM',
  default: {
    squat: 0,
    benchPress: 0,
    deadlift: 0,
  },
});
