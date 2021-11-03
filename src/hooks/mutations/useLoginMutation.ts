import { gql, useMutation } from '@apollo/client';
import { MutationTuple } from '@apollo/client/react';

import { AUTHENTICATION_RESPONSE_FIELDS } from '@src/fragments/user';
import { Mutation, MutationLoginArgs } from '@src/types/graphql';

const LOGIN = gql`
  ${AUTHENTICATION_RESPONSE_FIELDS}
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ...AuthenticationResponseFields
    }
  }
`;

const useLoginMutation = (): MutationTuple<
  Pick<Mutation, 'login'>,
  MutationLoginArgs
> => useMutation<Pick<Mutation, 'login'>, MutationLoginArgs>(LOGIN);

export default useLoginMutation;
