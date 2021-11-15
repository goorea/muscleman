import { gql, useMutation } from '@apollo/client';
import { FetchResult } from '@apollo/client/link/core';
import { MutationFunctionOptions, MutationResult } from '@apollo/client/react';

import useErrorEffect from '@src/hooks/useErrorEffect';
import { Mutation, MutationUpdatePlanArgs } from '@src/types/graphql';

const UPDATE_PLAN = gql`
  mutation updatePlan($_id: ObjectId!, $input: UpdatePlanInput!) {
    updatePlan(_id: $_id, input: $input)
  }
`;

const useUpdatePlanMutation = (): [
  (
    options?: MutationFunctionOptions<
      Pick<Mutation, 'updatePlan'>,
      MutationUpdatePlanArgs
    >,
  ) => Promise<FetchResult<Pick<Mutation, 'updatePlan'>>>,
  Pick<MutationResult<Pick<Mutation, 'updatePlan'>>, 'data' | 'loading'>,
] => {
  const [updatePlan, { data, error, loading }] = useMutation<
    Pick<Mutation, 'updatePlan'>,
    MutationUpdatePlanArgs
  >(UPDATE_PLAN);

  useErrorEffect(error);

  return [updatePlan, { data, loading }];
};

export default useUpdatePlanMutation;
