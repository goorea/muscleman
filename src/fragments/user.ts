import { gql } from '@apollo/client';

export const CORE_USER_FIELDS = gql`
  fragment CoreUserFields on User {
    _id
    createdAt
    updatedAt
    name
    email
    nickname
    gender
    birth
    tel
    profileImagePath
    roles
    provider
  }
`;

export const AUTHENTICATION_RESPONSE_FIELDS = gql`
  ${CORE_USER_FIELDS}
  fragment AuthenticationResponseFields on AuthenticationResponse {
    token
    refreshToken
    user {
      ...CoreUserFields
    }
  }
`;
