import { useRecoilValue } from 'recoil';

import {
  editingPlansState,
  selectedEditingVolumeIDState,
  selectedEditingVolumeState,
} from '@src/screens/EditPlanScreen/recoils';
import { EditingPlan, EditingVolume } from '@src/types';

const useIsEditing = () => {
  const selectedEditingVolumeID = useRecoilValue<string>(
    selectedEditingVolumeIDState,
  );
  const planID =
    useRecoilValue<EditingPlan[]>(editingPlansState).find(plan =>
      plan.volumes.some(({ _id }) => _id === selectedEditingVolumeID),
    )?._id || '';
  const selectedEditingVolume = useRecoilValue<EditingVolume | undefined>(
    selectedEditingVolumeState(planID || ''),
  );

  return {
    isEditing: !!selectedEditingVolume,
  };
};

export default useIsEditing;
