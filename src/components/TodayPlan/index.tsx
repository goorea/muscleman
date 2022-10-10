import { NavigationProp } from '@react-navigation/core/src/types';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

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
  TrainingDetail,
} from './styled';

type P = {
  plan: Plan;
};

const TodayPlan: React.FC<P> = ({ plan }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const source = plan.training.thumbnailPath
    ? { uri: plan.training.thumbnailPath }
    : require('@src/resources/images/mock.png');
  const { loading, onToggleComplete } = useToggleComplete(plan);
  const footerText = useFooterText(plan.volumes || []);
  const edit = useCallback(
    () =>
      navigation.navigate('Main', {
        screen: 'Plans',
        params: { plannedAt: plan.plannedAt },
      }),
    [navigation, plan.plannedAt],
  );
  const complete = plan.volumes?.every(volume => volume.complete) || false;
  const { editIconProps, completeIconProps } = useIconProps(complete);

  return (
    <Container>
      <TrainingImage source={source} />
      <TrainingDetail>
        <Text size={12} weight="bold" color="primary">
          {getTrainingTypeForKorean(plan.training.type)}
        </Text>
        <Text ellipsis>{plan.training.name}</Text>
        <Text size={10} color="grey3" italic={true}>
          {footerText}
        </Text>
      </TrainingDetail>
      <ButtonGroup>
        <VolumeButton onPress={edit} icon={editIconProps} />
        <CompleteButton
          loading={loading}
          onPress={onToggleComplete}
          complete={complete}
          icon={completeIconProps}
        />
      </ButtonGroup>
    </Container>
  );
};

export default TodayPlan;
