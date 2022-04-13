import { atom, selectorFamily } from 'recoil';

import { SBDOneRM } from '@src/operations/queries/getOneRM';
import { User, Plan } from '@src/types/graphql';

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

export const plansState = atom<Plan[]>({
  key: 'plansState',
  default: [],
});

export const planState = selectorFamily<Plan | undefined, string>({
  key: 'planState',
  get:
    planID =>
    ({ get }) =>
      get(plansState).find(({ _id }) => _id === planID),
  set:
    planID =>
    ({ set }, newValue) => {
      set(plansState, prevPlans =>
        prevPlans.map(prevPlan =>
          prevPlan._id === planID ? (newValue as Plan) : prevPlan,
        ),
      );
    },
});
