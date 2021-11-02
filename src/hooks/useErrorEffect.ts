import { ApolloError } from '@apollo/client';
import { useEffect } from 'react';

import { flash } from '@src/functions';

export const ERROR_CODES = {
  DOCUMENT_NOT_FOUND_ERROR: 'DOCUMENT_NOT_FOUND_ERROR',
  BAD_USER_INPUT: 'BAD_USER_INPUT',
  GRAPHQL_VALIDATION_FAILED: 'GRAPHQL_VALIDATION_FAILED',
  AUTHENTICATE_FAILED_ERROR: 'AUTHENTICATE_FAILED_ERROR',
  FORBIDDEN_ERROR: 'FORBIDDEN_ERROR',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  TOKEN_EXPIRED_ERROR: 'TOKEN_EXPIRED_ERROR',
  VERIFIED_ERROR: 'VERIFIED_ERROR',
} as const;

export function useErrorEffect(error?: ApolloError): void {
  useEffect(() => {
    if (error) {
      flash({
        title: error.name,
        contents: error.message,
        type: 'error',
      });
    }
  }, [error]);
}
