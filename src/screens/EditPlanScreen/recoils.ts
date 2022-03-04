import { atom, selectorFamily } from 'recoil';

import { EditingPlan, EditingVolume } from '@src/types';

export const editingPlans = atom<EditingPlan[]>({
  key: 'editingPlans',
  default: [],
});

export const editingVolumesState = selectorFamily<EditingVolume[], string>({
  key: 'editingVolumes',
  get:
    planID =>
    ({ get }) =>
      get(editingPlans).find(plan => plan._id === planID)?.volumes || [],
  set:
    planID =>
    ({ set }, newValue) => {
      set(editingPlans, prevValue =>
        prevValue.map(plan =>
          plan._id === planID
            ? {
                ...plan,
                volumes: newValue as EditingVolume[],
              }
            : plan,
        ),
      );
    },
});

export const selectedEditingVolumeIDState = atom<string>({
  key: 'selectedEditingVolumeID',
  default: '',
});

export const selectedEditingVolumeState = selectorFamily<
  EditingVolume | undefined,
  string
>({
  key: 'selectedEditingVolumeState',
  get:
    planID =>
    ({ get }) =>
      get(editingVolumesState(planID)).find(
        volume => volume._id === get(selectedEditingVolumeIDState),
      ),
  set:
    planID =>
    ({ get, set }, newValue) => {
      set(editingVolumesState(planID), prevValue =>
        prevValue?.map(volume =>
          volume._id === get(selectedEditingVolumeIDState)
            ? (newValue as EditingVolume)
            : volume,
        ),
      );
    },
});
