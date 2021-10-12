import { gql, useMutation } from '@apollo/client';
import {
  MutationFunctionOptions,
  MutationResult,
} from '@apollo/client/react/types/types';
import { Mutation, MutationUpdatePlanArgs } from '@src/types/graphql';
import { FetchResult } from '@apollo/client/link/core';
import { useErrorEffect } from '@src/hooks/useErrorEffect';

const UPDATE_PLAN = gql`
  mutation updatePlan($_id: ObjectId!, $input: PlanInput!) {
    updatePlan(_id: $_id, input: $input)
  }
`;

export function useUpdatePlanMutation(): [
  (
    options?: MutationFunctionOptions<
      Mutation['updatePlan'],
      MutationUpdatePlanArgs
    >,
  ) => Promise<FetchResult<Mutation['updatePlan']>>,
  Pick<MutationResult<Mutation['updatePlan']>, 'data' | 'loading'>,
] {
  const [updatePlan, { data, error, loading }] = useMutation<
    Mutation['updatePlan'],
    MutationUpdatePlanArgs
  >(UPDATE_PLAN);

  useErrorEffect(error);

  return [updatePlan, { data, loading }];
}
