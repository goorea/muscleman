import { gql, QueryResult, useQuery } from '@apollo/client';
import { Query } from '@src/types/graphql';
import { useErrorEffect } from '@src/hooks/useErrorEffect';
import { CORE_PLAN_FIELDS } from '@src/fragments/plan';

const PLANS = gql`
  ${CORE_PLAN_FIELDS}
  query plans {
    plans {
      ...CorePlanFields
    }
  }
`;

export function usePlansQuery(): Pick<
  QueryResult<Pick<Query, 'plans'>, {}>,
  'data' | 'loading'
> {
  const { data, error, loading } = useQuery<Pick<Query, 'plans'>>(PLANS);

  useErrorEffect(error);

  return { data, loading };
}
