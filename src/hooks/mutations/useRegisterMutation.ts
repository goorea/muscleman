import { gql, useMutation } from '@apollo/client';
import { Mutation, MutationRegisterArgs } from '@src/types/graphql';
import { FetchResult } from '@apollo/client/link/core';
import {
  MutationFunctionOptions,
  MutationResult,
} from '@apollo/client/react/types/types';
import { useErrorEffect } from '@src/hooks/useErrorEffect';
import { CORE_USER_FIELDS } from '@src/fragments/user';

export const REGISTER = gql`
  ${CORE_USER_FIELDS}
  mutation register($input: UserInput!) {
    register(input: $input) {
      ...CoreUserFields
    }
  }
`;

export function useRegisterMutation(): [
  (
    options?: MutationFunctionOptions<
      Mutation['register'],
      MutationRegisterArgs
    >,
  ) => Promise<FetchResult<Mutation['register']>>,
  Pick<MutationResult<Mutation['register']>, 'data' | 'loading'>,
] {
  const [register, { data, error, loading }] = useMutation<
    Mutation['register'],
    MutationRegisterArgs
  >(REGISTER);

  useErrorEffect(error);

  return [register, { data, loading }];
}
