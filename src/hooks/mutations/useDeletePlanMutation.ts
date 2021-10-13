import { gql, useMutation } from '@apollo/client';
import {
  MutationFunctionOptions,
  MutationResult,
} from '@apollo/client/react/types/types';
import { Mutation, MutationDeletePlanArgs } from '@src/types/graphql';
import { FetchResult } from '@apollo/client/link/core';
import { useErrorEffect } from '@src/hooks/useErrorEffect';

const DELETE_PLAN = gql`
  mutation deletePlan($_id: ObjectId!) {
    deletePlan(_id: $_id)
  }
`;

export function useDeletePlanMutation(): [
  (
    options?: MutationFunctionOptions<
      Pick<Mutation, 'deletePlan'>,
      MutationDeletePlanArgs
    >,
  ) => Promise<FetchResult<Pick<Mutation, 'deletePlan'>>>,
  Pick<MutationResult<Pick<Mutation, 'deletePlan'>>, 'data' | 'loading'>,
] {
  const [deletePlan, { data, error, loading }] = useMutation<
    Pick<Mutation, 'deletePlan'>,
    MutationDeletePlanArgs
  >(DELETE_PLAN);

  useErrorEffect(error);

  return [deletePlan, { data, loading }];
}
