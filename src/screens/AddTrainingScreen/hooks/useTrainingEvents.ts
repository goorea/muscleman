import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dispatch, SetStateAction, useCallback } from 'react';

import { Training } from '@src/types/graphql';
import {
  PlanningStackParamList,
  RootStackParamList,
} from '@src/types/navigation';

const useTrainingEvents = (
  navigation: CompositeScreenProps<
    NativeStackScreenProps<PlanningStackParamList, 'AddTraining'>,
    NativeStackScreenProps<RootStackParamList>
  >['navigation'],
  route: CompositeScreenProps<
    NativeStackScreenProps<PlanningStackParamList, 'AddTraining'>,
    NativeStackScreenProps<RootStackParamList>
  >['route'],
  selectedTrainings: Training[],
  setSelectedTrainings: Dispatch<SetStateAction<Training[]>>,
): {
  toggleTraining: (training: Training) => void;
  addTrainings: () => void;
} => ({
  toggleTraining: (training: Training) => {
    setSelectedTrainings(prevState => {
      if (prevState.every(prevTraining => prevTraining._id !== training._id)) {
        return prevState.concat(training);
      }

      return prevState.filter(
        prevTraining => prevTraining._id !== training._id,
      );
    });
  },
  addTrainings: useCallback(() => {
    navigation.navigate('EditPlan', {
      plannedAt: route.params.plannedAt,
      trainings: selectedTrainings,
    });
  }, [navigation, route.params.plannedAt, selectedTrainings]),
});

export default useTrainingEvents;
