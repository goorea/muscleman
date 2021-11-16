import React, { useCallback, useState } from 'react';
import { View } from 'react-native';

import Text from '@src/components/Text';
import useFooterText from '@src/components/TodayPlan/hooks/useFooterText';
import { getTrainingTypeForKorean } from '@src/functions';
import { Plan } from '@src/types/graphql';

import useIconProps from './hooks/useIconProps';
import useToggleComplete from './hooks/useToggleComplete';
import {
  CompleteButton,
  SetButton,
  ButtonGroup,
  Container,
  PlanImage,
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
  const footerText = useFooterText(plan.sets || []);
  // TODO: Edit
  const edit = useCallback(() => {}, []);
  const { editIconProps, completeIconProps } = useIconProps(plan);

  return (
    <Container>
      <PlanImage source={source} />
      <View>
        <Text size={12} weight="bold" color="primary">
          {getTrainingTypeForKorean(plan.training.type)}
        </Text>
        <Text>{plan.training.name}</Text>
        <Text size={10} color="grey3">
          {footerText}
        </Text>
      </View>
      <ButtonGroup>
        <SetButton onPress={edit} icon={editIconProps} />
        <CompleteButton
          loading={loading}
          onPress={onToggleComplete}
          complete={plan.complete}
          icon={completeIconProps}
        />
      </ButtonGroup>
    </Container>
  );
};

export default TodayPlan;
