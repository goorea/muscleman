import { gql } from '@apollo/client';

import { TRAINING_FIELDS } from '@src/fragments/training';
import { CORE_USER_FIELDS } from '@src/fragments/user';
import { CORE_VOLUME_FIELDS } from '@src/fragments/volume';

export const CORE_PLAN_FIELDS = gql`
  ${CORE_USER_FIELDS}
  ${TRAINING_FIELDS}
  ${CORE_VOLUME_FIELDS}
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
    complete
    volumes {
      ...CoreVolumeFields
    }
    oneRM
  }
`;
