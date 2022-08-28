import { gql } from '@apollo/client';

export const CORE_VOLUME_FIELDS = gql`
  fragment CoreVolumeFields on Volume {
    _id
    createdAt
    updatedAt
    count
    weight
    distances
    times
    total
    complete
    oneRM
  }
`;
