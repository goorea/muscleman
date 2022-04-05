import { gql, useMutation } from '@apollo/client';
import { FetchResult } from '@apollo/client/link/core';
import { MutationFunctionOptions, MutationResult } from '@apollo/client/react';

import { CORE_PLAN_FIELDS } from '@src/fragments/plan';
import useErrorEffect from '@src/hooks/useErrorEffect';
import {
  Mutation,
  MutationMultipleCreateOrUpdatePlansArgs,
} from '@src/types/graphql';

export const MULTIPLE_CREATE_OR_UPDATE_PLANS = gql`
  ${CORE_PLAN_FIELDS}
  mutation multipleCreateOrUpdatePlans($inputs: [PlanInput!]!) {
    multipleCreateOrUpdatePlans(inputs: $inputs) {
      ...CorePlanFields
    }
  }
`;

export const useMultipleCreateOrUpdatePlansMutation = (): [
  (
    options?: MutationFunctionOptions<
      Pick<Mutation, 'multipleCreateOrUpdatePlans'>,
      MutationMultipleCreateOrUpdatePlansArgs
    >,
  ) => Promise<FetchResult<Pick<Mutation, 'multipleCreateOrUpdatePlans'>>>,
  Pick<
    MutationResult<Pick<Mutation, 'multipleCreateOrUpdatePlans'>>,
    'data' | 'loading'
  >,
] => {
  const [multipleCreateOrUpdatePlans, { data, error, loading }] = useMutation<
    Pick<Mutation, 'multipleCreateOrUpdatePlans'>,
    MutationMultipleCreateOrUpdatePlansArgs
  >(MULTIPLE_CREATE_OR_UPDATE_PLANS);

  useErrorEffect(error);

  return [multipleCreateOrUpdatePlans, { data, loading }];
};
