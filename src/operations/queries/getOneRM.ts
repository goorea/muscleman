import { gql } from '@apollo/client';

export const GET_ONE_RM = gql`
  query getOneRM($name: String!) {
    getOneRM(name: $name)
  }
`;
