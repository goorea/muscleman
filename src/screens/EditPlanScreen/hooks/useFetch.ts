import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { flash } from '@src/functions';
import { useMultipleCreateOrUpdatePlansMutation } from '@src/operations/mutations/multipleCreateOrUpdatePlans';
import { plansState } from '@src/recoils';
import { editingPlans as editingPlansAtom } from '@src/screens/EditPlanScreen/recoils';
import { EditingPlan } from '@src/types';
import { Plan } from '@src/types/graphql';
import {
  PlanningStackParamList,
  RootStackParamList,
} from '@src/types/navigation';

const useFetch = ({
  navigation,
  route,
}: CompositeScreenProps<
  NativeStackScreenProps<PlanningStackParamList, 'EditPlan'>,
  NativeStackScreenProps<RootStackParamList>
>): {
  loading: boolean;
  editingPlans: EditingPlan[];
  submit: () => void;
} => {
  const { plannedAt } = route.params;
  const [multipleCreateOrUpdatePlans, { data, loading }] =
    useMultipleCreateOrUpdatePlansMutation();
  const [plans, setPlans] = useRecoilState<Plan[]>(plansState);
  const [editingPlans, setEditingPlans] =
    useRecoilState<EditingPlan[]>(editingPlansAtom);

  const submit = useCallback(async () => {
    if (editingPlans.some(plan => plan.volumes.length === 0)) {
      return flash({
        type: 'error',
        title: '유효성 검사에 실패했습니다.',
        contents: '볼륨은 하나 이상 추가해야합니다.',
      });
    }

    if (
      editingPlans.some(plan =>
        plan.volumes.some(
          volume => (volume.count || 0) < 1 || (volume.weight || 0) < 1,
        ),
      )
    ) {
      return flash({
        type: 'error',
        title: '유효성 검사에 실패했습니다.',
        contents: '무게와 개수는 0보다 커야 합니다.',
      });
    }

    await multipleCreateOrUpdatePlans({
      variables: {
        inputs: editingPlans.map(plan => ({
          _id: isNaN(Number(plan._id)) ? plan._id : undefined,
          plannedAt,
          training: plan.training._id,
          volumes: plan.volumes.map(volume => ({
            ...volume,
            _id: isNaN(Number(volume._id)) ? volume._id : undefined,
          })),
        })),
      },
    });

    flash({
      type: 'success',
      title: '운동 계획 완료',
      contents: '운동 계획을 생성했습니다',
    });
    setEditingPlans([]);
    navigation.goBack();
  }, [
    editingPlans,
    multipleCreateOrUpdatePlans,
    navigation,
    plannedAt,
    setEditingPlans,
  ]);

  useEffect(() => {
    const filteredPlans = plans.filter(plan =>
      dayjs(plan.plannedAt).isSame(plannedAt, 'day'),
    );

    if (filteredPlans.length) {
      setEditingPlans(
        filteredPlans.map(plan => ({
          ...plan,
          volumes:
            plan.volumes?.map(volume => ({
              _id: volume._id,
              complete: volume.complete || false,
              count: volume.count || undefined,
              weight: volume.weight || undefined,
            })) || [],
        })),
      );
    }

    return () => setEditingPlans([]);
  }, [plans, plannedAt, setEditingPlans]);

  useEffect(() => {
    if (data) {
      setEditingPlans(data.multipleCreateOrUpdatePlans as EditingPlan[]);
      setPlans(prevPlans => prevPlans.concat(data.multipleCreateOrUpdatePlans));
    }
  }, [data, setEditingPlans, setPlans]);

  return {
    loading,
    editingPlans,
    submit,
  };
};

export default useFetch;
