import { gql, useMutation } from '@apollo/client';
import { Mutation, MutationRegisterArgs } from '@src/types/graphql';
import { FetchResult } from '@apollo/client/link/core';
import {
  MutationFunctionOptions,
  MutationResult,
} from '@apollo/client/react/types/types';
import { ERROR_CODES } from '@src/hooks/useErrorEffect';
import { CORE_USER_FIELDS } from '@src/fragments/user';
import { Dispatch, SetStateAction } from 'react';
import { flash } from '@src/functions';

export const REGISTER = gql`
  ${CORE_USER_FIELDS}
  mutation register($input: UserInput!) {
    register(input: $input) {
      token
      refresh_token
      user {
        ...CoreUserFields
      }
    }
  }
`;

export function useRegisterMutation(
  setErrorMessages: Dispatch<SetStateAction<string[]>>,
): [
  (
    options?: MutationFunctionOptions<
      Pick<Mutation, 'register'>,
      MutationRegisterArgs
    >,
  ) => Promise<FetchResult<Pick<Mutation, 'register'>>>,
  Pick<MutationResult<Pick<Mutation, 'register'>>, 'data' | 'loading'>,
] {
  const [register, { data, error, loading }] = useMutation<
    Pick<Mutation, 'register'>,
    MutationRegisterArgs
  >(REGISTER);

  if (error) {
    setErrorMessages(
      error.graphQLErrors.map(e => {
        const code = e.extensions?.code;

        if (code === ERROR_CODES.BAD_USER_INPUT) {
          return '비밀번호가 일치하지 않습니다';
        } else if (
          [
            ERROR_CODES.GRAPHQL_VALIDATION_FAILED,
            ERROR_CODES.AUTHENTICATE_FAILED_ERROR,
          ].includes(e.extensions?.code)
        ) {
          return e.message;
        } else if (code === ERROR_CODES.FORBIDDEN_ERROR) {
          flash({
            title: '접근불가!',
            contents: '이미 로그인 하셨어요!',
            type: 'error',
          });

          return '';
        }

        flash({
          title: e.name,
          contents: e.message,
          type: 'error',
        });

        return '';
      }),
    );
  }

  return [register, { data, loading }];
}
