import { gql, useLazyQuery } from '@apollo/client';
import { Query } from '@src/types/graphql';
import {
  LazyQueryResult,
  QueryLazyOptions,
} from '@apollo/client/react/types/types';
import { useErrorEffect } from '@src/hooks/useErrorEffect';
import { CORE_USER_FIELDS } from '@src/fragments/user';

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
