import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { flash } from '@src/functions';
import {
  editingVolumesState,
  selectedEditingVolumeIDState,
  selectedEditingVolumeState,
} from '@src/screens/EditPlanScreen/recoils';
import { EditingVolume } from '@src/types';

const useEvents = (
  editingVolume: EditingVolume,
  planID: string,
): {
  selected: boolean;
  select: () => void;
  toggleComplete: () => void;
  deleteVolume: () => void;
} => {
  const selectedEditingVolume = useRecoilValue<EditingVolume | undefined>(
    selectedEditingVolumeState(planID),
  );
  const setEditingVolumes = useSetRecoilState<EditingVolume[]>(
    editingVolumesState(planID),
  );
  const setSelectedEditingVolumeID = useSetRecoilState<string>(
    selectedEditingVolumeIDState,
  );

  const selected = editingVolume._id === selectedEditingVolume?._id;

  const select = () => setSelectedEditingVolumeID(editingVolume._id);

  const toggleComplete = useCallback(
    () =>
      setEditingVolumes(prevVolumes =>
        prevVolumes.map(volume =>
          volume._id === editingVolume._id
            ? { ...volume, complete: !volume.complete }
            : volume,
        ),
      ),
    [editingVolume._id, setEditingVolumes],
  );

  const deleteVolume = useCallback(() => {
    setEditingVolumes(prevVolumes => {
      if (prevVolumes.length < 2) {
        flash({
          type: 'info',
          title: '정보',
          contents: '볼륨은 한 개 이상 있어야 합니다.',
        });

        return prevVolumes;
      }

      return prevVolumes.filter(({ _id }) => _id !== editingVolume._id);
    });
  }, [editingVolume._id, setEditingVolumes]);

  return {
    selected,
    select,
    toggleComplete,
    deleteVolume,
  };
};

export default useEvents;
