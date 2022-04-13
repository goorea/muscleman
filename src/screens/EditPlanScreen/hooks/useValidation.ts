import { useRecoilValue } from 'recoil';

import { flash } from '@src/functions';
import { editingPlans as editingPlansAtom } from '@src/screens/EditPlanScreen/recoils';
import { EditingPlan } from '@src/types';

const useValidation = (): { validation: () => boolean } => {
  const editingPlans = useRecoilValue<EditingPlan[]>(editingPlansAtom);
  const validation = () => {
    if (editingPlans.some(plan => plan.volumes.length === 0)) {
      flash({
        type: 'error',
        title: '유효성 검사에 실패했습니다.',
        contents: '볼륨은 하나 이상 추가해야합니다.',
      });

      return false;
    }

    if (
      editingPlans.some(plan =>
        plan.volumes.some(
          volume => (volume.count || 0) < 1 || (volume.weight || 0) < 1,
        ),
      )
    ) {
      flash({
        type: 'error',
        title: '유효성 검사에 실패했습니다.',
        contents: '무게와 개수는 0보다 커야 합니다.',
      });

      return false;
    }

    return true;
  };

  return { validation };
};

export default useValidation;