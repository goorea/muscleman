import { gql } from '@apollo/client';

import { MODEL_FIELDS } from '@src/fragments/model';

export const CORE_USER_FIELDS = gql`
  ${MODEL_FIELDS}
  fragment CoreUserFields on User {
    ...ModelFields
    name
    email
    nickname
    gender
    birth
    tel
    profile_image_path
    roles
  }
`;

export const AUTHENTICATION_RESPONSE_FIELDS = gql`
  ${CORE_USER_FIELDS}
  fragment AuthenticationResponseFields on AuthenticationResponse {
    token
    refresh_token
    user {
      ...CoreUserFields
    }
  }
`;
