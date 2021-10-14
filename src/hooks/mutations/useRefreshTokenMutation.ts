import { gql, useMutation } from '@apollo/client';
import { Mutation, MutationRefreshTokenArgs } from '@src/types/graphql';
import { FetchResult } from '@apollo/client/link/core';
import {
  MutationFunctionOptions,
  MutationResult,
} from '@apollo/client/react/types/types';
import { useErrorEffect } from '@src/hooks/useErrorEffect';
import { LOGIN_RESPONSE_FIELDS } from '@src/fragments/user';

const REFRESH_TOKEN = gql`
  ${LOGIN_RESPONSE_FIELDS}
  mutation refreshToken($refresh_token: String!) {
    refreshToken(refresh_token: $refresh_token) {
      ...LoginResponseFields
    }
  }
`;

export function useRefreshTokenMutation(): [
  (
    options?: MutationFunctionOptions<
      Pick<Mutation, 'refreshToken'>,
      MutationRefreshTokenArgs
    >,
  ) => Promise<FetchResult<Pick<Mutation, 'refreshToken'>>>,
  Pick<MutationResult<Pick<Mutation, 'refreshToken'>>, 'data' | 'loading'>,
] {
  const [refreshToken, { data, error, loading }] = useMutation<
    Pick<Mutation, 'refreshToken'>,
    MutationRefreshTokenArgs
  >(REFRESH_TOKEN);

  useErrorEffect(error);

  return [refreshToken, { data, loading }];
}