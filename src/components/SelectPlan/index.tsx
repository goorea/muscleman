import React from 'react';
import { TouchableOpacity } from 'react-native';

import Button from '@src/components/Button';
import Text from '@src/components/Text';
import { getTrainingTypeForKorean } from '@src/functions';
import useIconProps from '@src/hooks/useIconProps';
import { Plan } from '@src/types/graphql';

import useSelect from './hooks/useSelect';
import {
  Body,
  Container,
  FilledText,
  Header,
  Title,
  TrainingImage,
  VolumesContainer,
  VolumeWrapper,
} from './styled';

type P = {
  plan: Plan;
};

const SelectPlan: React.FC<P> = ({ plan }) => {
  const { selected, onToggleSelect } = useSelect(plan);
  const { completeIconProps } = useIconProps(selected);

  return (
    <Container>
      <TouchableOpacity onPress={onToggleSelect}>
        <Header>
          <Button
            testID="toggleButton"
            onPress={onToggleSelect}
            icon={completeIconProps}
            type="clear"
          />
          <Title size={12}>
            {getTrainingTypeForKorean(plan.training.type)} |{' '}
            {plan.training.name}
          </Title>
        </Header>

        <Body>
          <TrainingImage
            source={
              plan.training.thumbnailPath
                ? { uri: plan.training.thumbnailPath }
                : require('@src/resources/images/mock.png')
            }
          />

          <VolumesContainer>
            {plan.volumes?.map((volume, index) => (
              <VolumeWrapper key={volume._id}>
                <Text weight="bold" italic={true}>
                  {index + 1}Set
                </Text>
                <FilledText>{volume.weight}kg</FilledText>
                <FilledText>{volume.count}개</FilledText>
              </VolumeWrapper>
            ))}
          </VolumesContainer>
        </Body>
      </TouchableOpacity>
    </Container>
  );
};

export default SelectPlan;
