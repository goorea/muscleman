import { gql } from '@apollo/client';

export const TRAINING_FIELDS = gql`
  fragment TrainingFields on Training {
    _id
    createdAt
    updatedAt
    name
    type
    description
    preference
    thumbnailPath
    videoPath
  }
`;
