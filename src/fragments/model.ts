import { gql } from '@apollo/client';

export const MODEL_FIELDS = gql`
  fragment ModelFields on Model {
    _id
    created_at
    updated_at
  }
`;
