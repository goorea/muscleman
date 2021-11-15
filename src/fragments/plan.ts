import { gql } from '@apollo/client';

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
  ${CORE_USER_FIELDS}
  ${TRAINING_FIELDS}
  ${SET_FIELDS}
  fragment CorePlanFields on Plan {
    _id
    createdAt
    updatedAt
    user {
      ...CoreUserFields
    }
    training {
      ...TrainingFields
    }
    plannedAt
    sets {
      ...SetFields
    }
    complete
  }
`;
