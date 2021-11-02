import { gql, useLazyQuery } from '@apollo/client';
import { LazyQueryResult, QueryLazyOptions } from '@apollo/client/react';

import { CORE_USER_FIELDS } from '@src/fragments/user';
import { useErrorEffect } from '@src/hooks/useErrorEffect';
import { Query } from '@src/types/graphql';

const ME = gql`
  ${CORE_USER_FIELDS}
  query me {
    me {
      ...CoreUserFields
    }
  }
`;

export function useMeLazyQuery(): [
  (options?: QueryLazyOptions<{}>) => void,
  Pick<LazyQueryResult<Pick<Query, 'me'>, {}>, 'data' | 'loading'>,
] {
  const [me, { data, error, loading }] = useLazyQuery<Pick<Query, 'me'>>(ME);

  useErrorEffect(error);

  return [me, { data, loading }];
}
