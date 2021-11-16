import { useLazyQuery } from '@apollo/client';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { useUpdatePlanMutation } from '@src/operations/mutations/updatePlan';
import { GET_SBD_ONE_RM, SBDOneRM } from '@src/operations/queries/getOneRM';
import { SBDOneRMState } from '@src/recoils';
import { Plan } from '@src/types/graphql';

const useToggleComplete = (
  plan: Plan,
  setPlan: Dispatch<SetStateAction<Plan>>,
): {
  loading: boolean;
  onToggleComplete: () => Promise<void>;
} => {
  const setSBDOneRM = useSetRecoilState<SBDOneRM>(SBDOneRMState);
  const [updatePlan, { loading }] = useUpdatePlanMutation();
  const [getSBDOneRM, { data }] = useLazyQuery<SBDOneRM>(GET_SBD_ONE_RM, {
    fetchPolicy: 'network-only',
  });
  const onToggleComplete = useCallback(async () => {
    await updatePlan({
      variables: {
        _id: plan._id,
        input: {
          complete: !plan.complete,
        },
      },
    });

    setPlan(prevState => ({ ...prevState, complete: !prevState.complete }));

    if (
      ['바벨 백스쿼트', '벤치 프레스', '데드리프트'].includes(
        plan.training.name,
      )
    ) {
      await getSBDOneRM();
    }
  }, [updatePlan, plan, setPlan, getSBDOneRM]);

  useEffect(() => {
    if (data) {
      setSBDOneRM(data);
    }
  }, [data, setSBDOneRM]);

  return { loading, onToggleComplete };
};

export default useToggleComplete;
