import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { flash } from '@src/functions';
import useDeletePlanMutation from '@src/operations/mutations/deletePlan';
import { useMultipleCreateOrUpdatePlansMutation } from '@src/operations/mutations/multipleCreateOrUpdatePlans';
import { plansState } from '@src/recoils';
import {
  deletePlansState,
  editingPlansState,
} from '@src/screens/EditPlanScreen/recoils';
import { EditingPlan } from '@src/types';
import { Plan } from '@src/types/graphql';
import {
  PlanningStackParamList,
  RootStackParamList,
} from '@src/types/navigation';

import useValidation from './useValidation';

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
  const { validation } = useValidation();
  const [multipleCreateOrUpdatePlans, { loading }] =
    useMultipleCreateOrUpdatePlansMutation(() => {
      flash({
        type: 'success',
        title: '운동 계획 완료',
        contents: '운동을 계획 했습니다.',
      });
      navigation.goBack();
    });
  const [deletePlan] = useDeletePlanMutation();
  const plans = useRecoilValue<Plan[]>(plansState);
  const [editingPlans, setEditingPlans] =
    useRecoilState<EditingPlan[]>(editingPlansState);
  const [deletePlans, setDeletePlans] =
    useRecoilState<string[]>(deletePlansState);

  const submit = useCallback(async () => {
    if (validation()) {
      await Promise.all(
        deletePlans.map(planID =>
          deletePlan({
            variables: { _id: planID },
          }),
        ),
      );

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
    }
  }, [
    deletePlan,
    deletePlans,
    editingPlans,
    multipleCreateOrUpdatePlans,
    plannedAt,
    validation,
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
  }, [plans, plannedAt, setEditingPlans]);

  useEffect(
    () => () => {
      setEditingPlans([]);
      setDeletePlans([]);
    },
    [setDeletePlans, setEditingPlans],
  );

  return {
    loading,
    editingPlans,
    submit,
  };
};

export default useFetch;
