import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';

import {
  deletePlansState,
  selectedEditingVolumeIDState,
} from '@src/screens/EditPlanScreen/recoils';
import {
  PlanningStackParamList,
  RootStackParamList,
} from '@src/types/navigation';

const useReset = (
  navigation: CompositeScreenProps<
    NativeStackScreenProps<PlanningStackParamList, 'EditPlan'>,
    NativeStackScreenProps<RootStackParamList>
  >['navigation'],
) => {
  const resetSelectedEditingVolumeId = useResetRecoilState(
    selectedEditingVolumeIDState,
  );
  const resetDeletePlans = useResetRecoilState(deletePlansState);

  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      resetSelectedEditingVolumeId();
      resetDeletePlans();
    });
  }, [navigation, resetDeletePlans, resetSelectedEditingVolumeId]);
};

export default useReset;
