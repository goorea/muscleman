import { gql } from '@apollo/client';

import { MODEL_FIELDS } from '@src/fragments/model';
import { TRAINING_FIELDS } from '@src/fragments/training';
import { CORE_USER_FIELDS } from '@src/fragments/user';

export const SET_FIELDS = gql`
  fragment SetFields on Set {
    count
    weight
    times
    distances
  }
`;

export const CORE_PLAN_FIELDS = gql`
  ${MODEL_FIELDS}
  ${CORE_USER_FIELDS}
  ${TRAINING_FIELDS}
  ${SET_FIELDS}
  fragment CorePlanFields on Plan {
    ...ModelFields
    user {
      ...CoreUserFields
    }
    training {
      ...TrainingFields
    }
    plan_date
    sets {
      ...SetFields
    }
    complete
  }
`;
