import { gql } from '@apollo/client';

import { CORE_PLAN_FIELDS } from '@src/fragments/plan';

export const PLANS = gql`
  ${CORE_PLAN_FIELDS}
  query plans {
    plans {
      ...CorePlanFields
    }
  }
`;
