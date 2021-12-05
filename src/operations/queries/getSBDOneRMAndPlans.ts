import { gql } from '@apollo/client';

import { CORE_PLAN_FIELDS } from '@src/fragments/plan';
import { SBDOneRM } from '@src/operations/queries/getOneRM';
import { Query } from '@src/types/graphql';

export interface SBDOneRmAndPlans extends SBDOneRM, Pick<Query, 'plans'> {}

export const GET_SBD_ONE_RM_AND_PLANS = gql`
  ${CORE_PLAN_FIELDS}
  query getSBDOneRMAndTodayPlans {
    squat: getOneRM(name: "바벨 백스쿼트")
    benchPress: getOneRM(name: "벤치 프레스")
    deadlift: getOneRM(name: "데드리프트")
    plans {
      ...CorePlanFields
    }
  }
`;
