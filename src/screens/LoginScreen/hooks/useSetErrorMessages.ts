import { ApolloError } from '@apollo/client/errors';
import { Dispatch, SetStateAction, useEffect } from 'react';

import { flash } from '@src/functions';
import { ERROR_CODES } from '@src/hooks/useErrorEffect';

const useSetErrorMessages = (
  errorMessages: string[],
  setErrorMessages: Dispatch<SetStateAction<string[]>>,
  error?: ApolloError,
) => {
  useEffect(() => {
    if (error) {
      setErrorMessages(
        error.graphQLErrors.map(e => {
          const code = e.extensions?.code;

          if (code === ERROR_CODES.DOCUMENT_NOT_FOUND_ERROR) {
            return '존재하지 않는 사용자 입니다';
          } else if (code === ERROR_CODES.BAD_USER_INPUT) {
            return '소셜 로그인으로 다시 시도해주세요';
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
    } else if (errorMessages.length) {
      setErrorMessages([]);
    }
  }, [errorMessages, setErrorMessages, error]);
};

export default useSetErrorMessages;
