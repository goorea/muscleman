import { gql, useMutation } from '@apollo/client';
import { Mutation } from '@src/types/graphql';
import { FetchResult } from '@apollo/client/link/core';
import {
  MutationFunctionOptions,
  MutationResult,
} from '@apollo/client/react/types/types';
import { useErrorEffect } from '@src/hooks/useErrorEffect';

const SEND_VERIFY_EMAIL = gql`
  mutation sendVerifyEmail {
    sendVerifyEmail
  }
`;

export function useSendVerifyEmailMutation(): [
  (
    options?: MutationFunctionOptions<Pick<Mutation, 'sendVerifyEmail'>>,
  ) => Promise<FetchResult<Pick<Mutation, 'sendVerifyEmail'>>>,
  Pick<MutationResult<Pick<Mutation, 'sendVerifyEmail'>>, 'data' | 'loading'>,
] {
  const [sendVerifyEmail, { data, error, loading }] =
    useMutation<Pick<Mutation, 'sendVerifyEmail'>>(SEND_VERIFY_EMAIL);

  useErrorEffect(error);

  return [sendVerifyEmail, { data, loading }];
}
