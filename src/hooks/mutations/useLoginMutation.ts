import { gql, useMutation } from '@apollo/client';
import { Mutation, MutationLoginArgs } from '@src/types/graphql';
import { MutationTuple } from '@apollo/client/react/types/types';
import { AUTHENTICATION_RESPONSE_FIELDS } from '@src/fragments/user';

const LOGIN = gql`
  ${AUTHENTICATION_RESPONSE_FIELDS}
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ...AuthenticationResponseFields
    }
  }
`;

export function useLoginMutation(): MutationTuple<
  Pick<Mutation, 'login'>,
  MutationLoginArgs
> {
  return useMutation<Pick<Mutation, 'login'>, MutationLoginArgs>(LOGIN);
}
