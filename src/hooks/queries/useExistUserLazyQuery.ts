import { gql, useLazyQuery } from '@apollo/client';
import { LazyQueryResult, QueryLazyOptions } from '@apollo/client/react';

import { useErrorEffect } from '@src/hooks/useErrorEffect';
import { Query } from '@src/types/graphql';

export const EXIST_USER = gql`
  query existUser($field: String!, $value: String!) {
    existUser(field: $field, value: $value)
  }
`;

export function useExistUserLazyQuery(): [
  (options?: QueryLazyOptions<{}>) => void,
  Pick<LazyQueryResult<Pick<Query, 'existUser'>, {}>, 'data' | 'loading'>,
] {
  const [existUser, { data, error, loading }] =
    useLazyQuery<Pick<Query, 'existUser'>>(EXIST_USER);

  useErrorEffect(error);

  return [existUser, { data, loading }];
}
