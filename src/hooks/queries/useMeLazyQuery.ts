import { gql, useLazyQuery } from '@apollo/client';
import { Query } from '@src/types/graphql';
import {
  LazyQueryResult,
  QueryLazyOptions,
} from '@apollo/client/react/types/types';
import { useErrorEffect } from '@src/hooks/useErrorEffect';
import { CORE_USER_FIELDS } from '@src/fragments/user';

const UseMeLazyQuery = gql`
  ${CORE_USER_FIELDS}
  query me {
    me {
      ...CoreUserFields
    }
  }
`;

export function useMeQuery(): [
  (options?: QueryLazyOptions<{}>) => void,
  Pick<LazyQueryResult<Query['me'], {}>, 'data' | 'loading'>,
] {
  const [me, { data, error, loading }] =
    useLazyQuery<Query['me']>(UseMeLazyQuery);

  useErrorEffect(error);

  return [me, { data, loading }];
}
