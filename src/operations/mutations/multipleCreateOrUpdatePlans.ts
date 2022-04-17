import { gql, useMutation } from '@apollo/client';
import { FetchResult } from '@apollo/client/link/core';
import { MutationFunctionOptions, MutationResult } from '@apollo/client/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CORE_PLAN_FIELDS } from '@src/fragments/plan';
import { useSBDOneRM } from '@src/operations/queries/getOneRM';
import { plansState } from '@src/recoils';
import { deletePlansState } from '@src/screens/EditPlanScreen/recoils';
import {
  Mutation,
  MutationMultipleCreateOrUpdatePlansArgs,
  Plan,
} from '@src/types/graphql';

export const MULTIPLE_CREATE_OR_UPDATE_PLANS = gql`
  ${CORE_PLAN_FIELDS}
  mutation multipleCreateOrUpdatePlans($inputs: [PlanInput!]!) {
    multipleCreateOrUpdatePlans(inputs: $inputs) {
      ...CorePlanFields
    }
  }
`;

export const useMultipleCreateOrUpdatePlansMutation = (
  callback: () => any | undefined = () => null,
): [
  (
    options?: MutationFunctionOptions<
      Pick<Mutation, 'multipleCreateOrUpdatePlans'>,
      MutationMultipleCreateOrUpdatePlansArgs
    >,
  ) => Promise<FetchResult<Pick<Mutation, 'multipleCreateOrUpdatePlans'>>>,
  Pick<
    MutationResult<Pick<Mutation, 'multipleCreateOrUpdatePlans'>>,
    'loading'
  >,
] => {
  const setPlans = useSetRecoilState<Plan[]>(plansState);
  const deletePlans = useRecoilValue<string[]>(deletePlansState);
  const [getSBDOneRM] = useSBDOneRM(callback);
  const [multipleCreateOrUpdatePlans, { loading }] = useMutation<
    Pick<Mutation, 'multipleCreateOrUpdatePlans'>,
    MutationMultipleCreateOrUpdatePlansArgs
  >(MULTIPLE_CREATE_OR_UPDATE_PLANS, {
    onCompleted: data => {
      setPlans(prevPlans => {
        const plansIds = (data.multipleCreateOrUpdatePlans as Plan[]).map(
          ({ _id }) => _id,
        );

        return prevPlans
          .filter(({ _id }) => !deletePlans.includes(_id))
          .filter(({ _id }) => !plansIds.includes(_id))
          .concat(data.multipleCreateOrUpdatePlans);
      });
      getSBDOneRM();
    },
  });

  return [multipleCreateOrUpdatePlans, { loading }];
};
