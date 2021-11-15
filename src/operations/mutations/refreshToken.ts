import { gql, useMutation } from '@apollo/client';
import { FetchResult } from '@apollo/client/link/core';
import { MutationFunctionOptions, MutationResult } from '@apollo/client/react';

import { AUTHENTICATION_RESPONSE_FIELDS } from '@src/fragments/user';
import useErrorEffect from '@src/hooks/useErrorEffect';
import { Mutation, MutationRefreshTokenArgs } from '@src/types/graphql';

export const REFRESH_TOKEN = gql`
  ${AUTHENTICATION_RESPONSE_FIELDS}
  mutation refreshToken($refreshToken: String!, $deviceID: String!) {
    refreshToken(refreshToken: $refreshToken, deviceID: $deviceID) {
      ...AuthenticationResponseFields
    }
  }
`;

export const useRefreshTokenMutation = (): [
  (
    options?: MutationFunctionOptions<
      Pick<Mutation, 'refreshToken'>,
      MutationRefreshTokenArgs
    >,
  ) => Promise<FetchResult<Pick<Mutation, 'refreshToken'>>>,
  Pick<MutationResult<Pick<Mutation, 'refreshToken'>>, 'data' | 'loading'>,
] => {
  const [refreshToken, { data, error, loading }] = useMutation<
    Pick<Mutation, 'refreshToken'>,
    MutationRefreshTokenArgs
  >(REFRESH_TOKEN);

  useErrorEffect(error);

  return [refreshToken, { data, loading }];
};
