import { gql, useMutation } from '@apollo/client';
import { CORE_PLAN_FIELDS } from '@src/fragments/plan';
import { Mutation, MutationCreatePlanArgs } from '@src/types/graphql';
import { FetchResult } from '@apollo/client/link/core';
import {
  MutationFunctionOptions,
  MutationResult,
} from '@apollo/client/react/types/types';
import { useErrorEffect } from '@src/hooks/useErrorEffect';

const CREATE_PLAN = gql`
  ${CORE_PLAN_FIELDS}
  mutation createPlan($input: PlanInput!) {
    createPlan(input: $input) {
      ...CorePlanFields
    }
  }
`;

export function useCreatePlanMutation(): [
  (
    options?: MutationFunctionOptions<
      Pick<Mutation, 'createPlan'>,
      MutationCreatePlanArgs
    >,
  ) => Promise<FetchResult<Pick<Mutation, 'createPlan'>>>,
  Pick<MutationResult<Pick<Mutation, 'createPlan'>>, 'data' | 'loading'>,
] {
  const [createPlan, { data, error, loading }] = useMutation<
    Pick<Mutation, 'createPlan'>,
    MutationCreatePlanArgs
  >(CREATE_PLAN);

  useErrorEffect(error);

  return [createPlan, { data, loading }];
}
