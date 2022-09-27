import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSetRecoilState } from 'recoil';

import Icon from '@src/components/Icon';
import Text from '@src/components/Text';
import useToggleComplete from '@src/components/TodayPlan/hooks/useToggleComplete';
import { getTrainingTypeForKorean } from '@src/functions';
import { plansState } from '@src/recoils';
import {
  PlanContainer,
  VolumeContainer,
  VolumnText,
} from '@src/screens/PlansScreen/styled';
import { Plan as PlanType } from '@src/types/graphql';

type P = {
  plan: PlanType;
};

const Plan: React.FC<P> = ({ plan }) => {
  const { onToggleVolumeComplete } = useToggleComplete(plan);
  const setPlansState = useSetRecoilState(plansState);

  const toggleComplete = async (volumeId: string) => {
    setPlansState(prev =>
      prev.map(prevPlan =>
        prevPlan._id === plan._id
          ? {
              ...prevPlan,
              volumes: prevPlan.volumes?.map(volume =>
                volume._id === volumeId
                  ? {
                      ...volume,
                      complete: !volume.complete,
                    }
                  : volume,
              ),
            }
          : prevPlan,
      ),
    );
    await onToggleVolumeComplete(volumeId);
  };

  return (
    <PlanContainer key={plan._id}>
      <Text weight="bold">
        {getTrainingTypeForKorean(plan.training.type)} | {plan.training.name}{' '}
        {plan.volumes?.length}세트
      </Text>

      {plan.volumes?.map((volume, i) => (
        <VolumeContainer key={i}>
          <Text color="grey3">
            <Text color="grey3" italic={true}>
              {i + 1}세트
            </Text>{' '}
            {volume.weight}kg x {volume.count}회
          </Text>
          <VolumnText color="grey3">
            {(volume.weight || 0) * (volume.count || 0)}kg
          </VolumnText>
          <TouchableOpacity onPress={() => toggleComplete(volume._id)}>
            <Icon
              type="feather"
              name={volume.complete ? 'check-square' : 'square'}
              color={volume.complete ? 'success' : 'warning'}
              size={20}
            />
          </TouchableOpacity>
        </VolumeContainer>
      ))}
    </PlanContainer>
  );
};

export default Plan;
