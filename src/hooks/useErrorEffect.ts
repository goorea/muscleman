import { useEffect } from 'react';
import { flash } from '@src/functions';
import { ApolloError } from '@apollo/client';

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
