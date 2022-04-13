import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { useMultipleCreateOrUpdatePlansMutation } from '@src/operations/mutations/multipleCreateOrUpdatePlans';
import { plansState } from '@src/recoils';
import { editingPlans as editingPlansAtom } from '@src/screens/EditPlanScreen/recoils';
import { EditingPlan } from '@src/types';
import { Plan } from '@src/types/graphql';
import {
  PlanningStackParamList,
  RootStackParamList,
} from '@src/types/navigation';

import useSBDOneRM from './useSBDOneRM';
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
  const { getSBDOneRM } = useSBDOneRM(navigation);
  const { validation } = useValidation();
  const [multipleCreateOrUpdatePlans, { data, loading }] =
    useMultipleCreateOrUpdatePlansMutation();
  const [plans, setPlans] = useRecoilState<Plan[]>(plansState);
  const [editingPlans, setEditingPlans] =
    useRecoilState<EditingPlan[]>(editingPlansAtom);

  const submit = useCallback(async () => {
    if (validation()) {
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
  }, [editingPlans, multipleCreateOrUpdatePlans, plannedAt, validation]);

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
      setPlans(prevPlans => {
        const plansIds = (data.multipleCreateOrUpdatePlans as Plan[]).map(
          ({ _id }) => _id,
        );

        return prevPlans
          .filter(({ _id }) => !plansIds.includes(_id))
          .concat(data.multipleCreateOrUpdatePlans);
      });
      getSBDOneRM();
    }
  }, [data, getSBDOneRM, setEditingPlans, setPlans]);

  return {
    loading,
    editingPlans,
    submit,
  };
};

export default useFetch;
