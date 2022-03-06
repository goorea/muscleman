import React, { useCallback, useState } from 'react';
import { View } from 'react-native';

import Text from '@src/components/Text';
import useFooterText from '@src/components/TodayPlan/hooks/useFooterText';
import { getTrainingTypeForKorean } from '@src/functions';
import useIconProps from '@src/hooks/useIconProps';
import { Plan } from '@src/types/graphql';

import useToggleComplete from './hooks/useToggleComplete';
import {
  CompleteButton,
  SetButton,
  ButtonGroup,
  Container,
  TrainingImage,
} from './styled';

type P = {
  plan: Plan;
};

const TodayPlan: React.FC<P> = ({ plan: _plan }) => {
  const [plan, setPlan] = useState<Plan>(_plan);
  const source = plan.training.thumbnailPath
    ? { uri: plan.training.thumbnailPath }
    : require('@src/resources/images/mock.png');
  const { loading, onToggleComplete } = useToggleComplete(plan, setPlan);
  const footerText = useFooterText(plan.volumes || []);
  // TODO: Edit
  const edit = useCallback(() => {}, []);
  const { editIconProps, completeIconProps } = useIconProps(
    plan.volumes?.every(volume => volume.complete) || false,
  );

  return (
    <Container>
      <TrainingImage source={source} />
      <View>
        <Text size={12} weight="bold" color="primary">
          {getTrainingTypeForKorean(plan.training.type)}
        </Text>
        <Text>{plan.training.name}</Text>
        <Text size={10} color="grey3" italic={true}>
          {footerText}
        </Text>
      </View>
      <ButtonGroup>
        <SetButton onPress={edit} icon={editIconProps} />
        <CompleteButton
          loading={loading}
          onPress={onToggleComplete}
          complete={
            plan.volumes && plan.volumes.every(volume => volume.complete)
          }
          icon={completeIconProps}
        />
      </ButtonGroup>
    </Container>
  );
};

export default TodayPlan;
