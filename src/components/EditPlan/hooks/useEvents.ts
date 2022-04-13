import { uniqueId } from 'lodash';
import { useCallback } from 'react';
import { DragEndParams } from 'react-native-draggable-flatlist/src/types';
import { useSetRecoilState } from 'recoil';

import {
  deletePlansState,
  editingPlansState,
  editingVolumesState,
} from '@src/screens/EditPlanScreen/recoils';
import { EditingPlan, EditingVolume } from '@src/types';

const useEvents = (
  planID: string,
): {
  toggleAllComplete: () => void;
  deletePlan: (_id: string) => void;
  onDragEnd: (params: DragEndParams<EditingVolume>) => void;
  addVolume: () => void;
} => {
  const setEditingPlans = useSetRecoilState<EditingPlan[]>(editingPlansState);
  const setEditingVolumes = useSetRecoilState<EditingVolume[]>(
    editingVolumesState(planID),
  );
  const setDeletePlans = useSetRecoilState<string[]>(deletePlansState);

  const toggleAllComplete = useCallback(
    () =>
      setEditingVolumes(prevVolumes => {
        const complete = !prevVolumes.every(volume => volume.complete);

        return prevVolumes.map(volume => ({
          ...volume,
          complete,
        }));
      }),
    [setEditingVolumes],
  );
  const deletePlan = useCallback(
    (_id: string) => {
      setEditingPlans(prevState => prevState.filter(plan => plan._id !== _id));
      if (isNaN(Number(_id))) {
        setDeletePlans(prevState => prevState.concat(_id));
      }
    },
    [setDeletePlans, setEditingPlans],
  );
  const onDragEnd = (params: DragEndParams<EditingVolume>) =>
    setEditingVolumes(params.data);
  const addVolume = useCallback(
    () =>
      setEditingVolumes(prevValue => {
        const lastVolume = prevValue.slice(-1)[0];

        return prevValue.concat({
          _id: uniqueId(),
          complete: lastVolume?.complete || false,
          count: lastVolume?.count || 0,
          weight: lastVolume?.weight || 0,
        });
      }),
    [setEditingVolumes],
  );

  return {
    toggleAllComplete,
    deletePlan,
    onDragEnd,
    addVolume,
  };
};

export default useEvents;
