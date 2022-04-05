import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { uniqueId } from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useSetRecoilState } from 'recoil';

import Icon from '@src/components/Icon';
import { editingPlans as editingPlansAtom } from '@src/screens/EditPlanScreen/recoils';
import { EditingPlan } from '@src/types';
import {
  PlanningStackParamList,
  RootStackParamList,
} from '@src/types/navigation';

import { AddPlanText, AddPlanWrapper } from '../styled';

const useTraining = ({
  navigation,
  route,
}: CompositeScreenProps<
  NativeStackScreenProps<PlanningStackParamList, 'EditPlan'>,
  NativeStackScreenProps<RootStackParamList>
>): {
  addTraining: () => void;
  node: React.ReactElement;
} => {
  const { plannedAt } = route.params;
  const setEditingPlans = useSetRecoilState<EditingPlan[]>(editingPlansAtom);

  useEffect(() => {
    const trainings = route.params.trainings;

    if (trainings?.length) {
      setEditingPlans(prevState => {
        const notExistTrainings = trainings.filter(training =>
          prevState.every(plan => plan.training._id !== training._id),
        );

        return notExistTrainings.length
          ? prevState.concat(
              notExistTrainings.map(training => ({
                _id: uniqueId(),
                plannedAt,
                training,
                volumes: [
                  {
                    _id: uniqueId(),
                    complete: false,
                    count: 0,
                    weight: 0,
                  },
                ],
              })),
            )
          : prevState;
      });
    }
  }, [route.params.trainings, setEditingPlans, plannedAt]);

  return {
    addTraining: useCallback(() => {
      navigation.navigate('AddTraining', { plannedAt });
    }, [navigation, plannedAt]),
    node: useMemo(
      () => (
        <AddPlanWrapper>
          <Icon type="ionicon" name="add" color="white" />
          <AddPlanText weight="bold" color="white">
            운동 추가
          </AddPlanText>
        </AddPlanWrapper>
      ),
      [],
    ),
  };
};

export default useTraining;
