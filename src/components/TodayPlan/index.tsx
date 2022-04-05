import { NavigationProp } from '@react-navigation/core/src/types';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';

import Text from '@src/components/Text';
import useFooterText from '@src/components/TodayPlan/hooks/useFooterText';
import { getTrainingTypeForKorean } from '@src/functions';
import { Plan } from '@src/types/graphql';
import { RootStackParamList } from '@src/types/navigation';

import useIconProps from './hooks/useIconProps';
import useToggleComplete from './hooks/useToggleComplete';
import {
  CompleteButton,
  VolumeButton,
  ButtonGroup,
  Container,
  TrainingImage,
} from './styled';

type P = {
  plan: Plan;
};

const TodayPlan: React.FC<P> = ({ plan: _plan }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [plan, setPlan] = useState<Plan>(_plan);
  const source = plan.training.thumbnailPath
    ? { uri: plan.training.thumbnailPath }
    : require('@src/resources/images/mock.png');
  const { loading, onToggleComplete } = useToggleComplete(plan, setPlan);
  const footerText = useFooterText(plan.volumes || []);
  const edit = useCallback(
    () =>
      navigation.navigate('Main', {
        screen: 'Plans',
        params: { plannedAt: plan.plannedAt },
      }),
    [navigation, plan.plannedAt],
  );
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
        <VolumeButton onPress={edit} icon={editIconProps} />
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
