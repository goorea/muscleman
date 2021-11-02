import { gql, QueryResult, useQuery } from '@apollo/client';

import { CORE_USER_FIELDS } from '@src/fragments/user';
import { useErrorEffect } from '@src/hooks/useErrorEffect';
import { Query } from '@src/types/graphql';

const UseUsersQuery = gql`
  ${CORE_USER_FIELDS}
  query users {
    users {
      ...CoreUserFields
    }
  }
`;

export function useUsersQuery(): Pick<
  QueryResult<Pick<Query, 'users'>, {}>,
  'data' | 'loading'
> {
  const { data, error, loading } =
    useQuery<Pick<Query, 'users'>>(UseUsersQuery);

  useErrorEffect(error);

  return { data, loading };
}
