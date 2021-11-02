import { gql, QueryResult, useQuery } from '@apollo/client';

import { CORE_PLAN_FIELDS } from '@src/fragments/plan';
import { useErrorEffect } from '@src/hooks/useErrorEffect';
import { Query } from '@src/types/graphql';

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
