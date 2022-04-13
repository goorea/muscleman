import { useLazyQuery } from '@apollo/client';
import { pick } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { useMultipleCreateOrUpdatePlansMutation } from '@src/operations/mutations/multipleCreateOrUpdatePlans';
import { GET_SBD_ONE_RM, SBDOneRM } from '@src/operations/queries/getOneRM';
import { planState, SBDOneRMState } from '@src/recoils';
import { Plan } from '@src/types/graphql';

const useToggleComplete = (
  plan: Plan,
): {
  loading: boolean;
  onToggleComplete: () => Promise<void>;
} => {
  const setPlan = useSetRecoilState<Plan | undefined>(planState(plan._id));
  const setSBDOneRM = useSetRecoilState<SBDOneRM>(SBDOneRMState);
  const [multipleCreateOrUpdatePlans, { loading }] =
    useMultipleCreateOrUpdatePlansMutation();
  const [getSBDOneRM, { data }] = useLazyQuery<SBDOneRM>(GET_SBD_ONE_RM, {
    fetchPolicy: 'network-only',
  });
  const complete =
    plan.volumes && !plan.volumes.every(volume => volume.complete);

  const onToggleComplete = useCallback(async () => {
    await multipleCreateOrUpdatePlans({
      variables: {
        inputs: [
          {
            _id: plan._id,
            plannedAt: plan.plannedAt,
            training: plan.training._id,
            volumes:
              plan.volumes?.map(volume => ({
                ...pick(volume, [
                  '_id',
                  'count',
                  'distances',
                  'times',
                  'weight',
                ]),
                complete,
              })) || [],
          },
        ],
      },
    });

    setPlan(prevPlan => {
      if (prevPlan) {
        return {
          ...prevPlan,
          volumes:
            prevPlan.volumes?.map(volume => ({ ...volume, complete })) || [],
        };
      }
    });

    if (
      ['바벨 백스쿼트', '벤치 프레스', '데드리프트'].includes(
        plan.training.name,
      )
    ) {
      await getSBDOneRM();
    }
  }, [multipleCreateOrUpdatePlans, plan, setPlan, complete, getSBDOneRM]);

  useEffect(() => {
    if (data) {
      setSBDOneRM(data);
    }
  }, [data, setSBDOneRM]);

  return { loading, onToggleComplete };
};

export default useToggleComplete;
