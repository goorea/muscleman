import { useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  selectedEditingVolumeIDState,
  selectedEditingVolumeState,
} from '@src/screens/EditPlanScreen/recoils';
import { EditingVolume } from '@src/types';

const useVolume = (
  planID: string,
): {
  close: () => void;
  changeVolume: (target: 'weight' | 'count', unit: number) => void;
  selectedEditingVolume?: EditingVolume;
} => {
  const setSelectedEditingVolumeID = useSetRecoilState<string>(
    selectedEditingVolumeIDState,
  );
  const [selectedEditingVolume, setSelectedEditingVolume] = useRecoilState<
    EditingVolume | undefined
  >(selectedEditingVolumeState(planID));

  const close = useCallback(() => {
    setSelectedEditingVolumeID('');
  }, [setSelectedEditingVolumeID]);

  const changeVolume = useCallback(
    (target: 'weight' | 'count', unit: number) => {
      setSelectedEditingVolume(prevVolume =>
        prevVolume && Number(prevVolume[target]) + unit < 0
          ? {
              ...prevVolume,
              [target]: Number(prevVolume[target]) + unit,
            }
          : prevVolume,
      );
    },
    [setSelectedEditingVolume],
  );

  return {
    close,
    changeVolume,
    selectedEditingVolume,
  };
};

export default useVolume;
