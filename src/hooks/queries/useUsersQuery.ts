import { gql, QueryResult, useQuery } from '@apollo/client';
import { Query } from '@src/types/graphql';
import { useErrorEffect } from '@src/hooks/useErrorEffect';
import { CORE_USER_FIELDS } from '@src/fragments/user';

const UseUsersQuery = gql`
  ${CORE_USER_FIELDS}
  query users {
    users {
      ...CoreUserFields
    }
  }
`;

export function useUsersQuery(): Pick<
  QueryResult<Query['users'], {}>,
  'data' | 'loading'
> {
  const { data, error, loading } = useQuery<Query['users']>(UseUsersQuery);

  useErrorEffect(error);

  return { data, loading };
}
