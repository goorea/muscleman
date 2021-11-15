import { gql } from '@apollo/client';

export const EXIST_EMAIL_FROM_USER = gql`
  query existEmailFromUser($value: String!) {
    existEmailFromUser: existUser(field: "email", value: $value)
  }
`;

export const EXIST_NICKNAME_FROM_USER = gql`
  query existNicknameFromUser($value: String!) {
    existNicknameFromUser: existUser(field: "nickname", value: $value)
  }
`;
