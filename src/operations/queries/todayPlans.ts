import { gql } from '@apollo/client';

import { CORE_PLAN_FIELDS } from '@src/fragments/plan';

export const TODAY_PLANS = gql`
  ${CORE_PLAN_FIELDS}
  query todayPlans {
    todayPlans {
      ...CorePlanFields
    }
  }
`;
