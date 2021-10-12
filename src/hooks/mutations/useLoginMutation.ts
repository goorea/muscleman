import { gql, useMutation } from '@apollo/client';
import { Mutation, MutationLoginArgs } from '@src/types/graphql';
import { FetchResult } from '@apollo/client/link/core';
import {
  MutationFunctionOptions,
  MutationResult,
} from '@apollo/client/react/types/types';
import { useErrorEffect } from '@src/hooks/useErrorEffect';
import { LOGIN_RESPONSE_FIELDS } from '@src/fragments/user';

const LOGIN = gql`
  ${LOGIN_RESPONSE_FIELDS}
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ...LoginResponseFields
    }
  }
`;

export function useLoginMutation(): [
  (
    options?: MutationFunctionOptions<Mutation['login'], MutationLoginArgs>,
  ) => Promise<FetchResult<Mutation['login']>>,
  Pick<MutationResult<Mutation['login']>, 'data' | 'loading'>,
] {
  const [login, { data, error, loading }] = useMutation<
    Mutation['login'],
    MutationLoginArgs
  >(LOGIN);

  useErrorEffect(error);

  return [login, { data, loading }];
}
