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

export const LOGIN_RESPONSE_FIELDS = gql`
  fragment LoginResponseFields on LoginResponse {
    token
    refresh_token
  }
`;
