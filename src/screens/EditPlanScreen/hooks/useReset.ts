import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

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
  const setSelectedEditingVolumeID = useSetRecoilState<string>(
    selectedEditingVolumeIDState,
  );
  const setDeletePlans = useSetRecoilState<string[]>(deletePlansState);

  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      setSelectedEditingVolumeID('');
      setDeletePlans([]);
    });
  }, [navigation, setDeletePlans, setSelectedEditingVolumeID]);
};

export default useReset;
