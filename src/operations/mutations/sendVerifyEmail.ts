import { gql, useMutation } from '@apollo/client';
import { FetchResult } from '@apollo/client/link/core';
import { MutationFunctionOptions, MutationResult } from '@apollo/client/react';

import useErrorEffect from '@src/hooks/useErrorEffect';
import { Mutation } from '@src/types/graphql';

const SEND_VERIFY_EMAIL = gql`
  mutation sendVerifyEmail {
    sendVerifyEmail
  }
`;

export const useSendVerifyEmailMutation = (): [
  (
    options?: MutationFunctionOptions<Pick<Mutation, 'sendVerifyEmail'>>,
  ) => Promise<FetchResult<Pick<Mutation, 'sendVerifyEmail'>>>,
  Pick<MutationResult<Pick<Mutation, 'sendVerifyEmail'>>, 'data' | 'loading'>,
] => {
  const [sendVerifyEmail, { data, error, loading }] =
    useMutation<Pick<Mutation, 'sendVerifyEmail'>>(SEND_VERIFY_EMAIL);

  useErrorEffect(error);

  return [sendVerifyEmail, { data, loading }];
};
