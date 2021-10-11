import { gql } from '@apollo/client';
import { MODEL_FIELDS } from '@src/fragments/model';

export const TRAINING_FIELDS = gql`
  ${MODEL_FIELDS}
  fragment TrainingFields on Training {
    ...ModelFields
    name
    type
    description
    preference
    thumbnail_path
    video_path
  }
`;
