import React from 'react';
import { Modal } from 'react-native';

import Text from '@src/components/Text';
import {
  getTrainingCategoryForKorean,
  getTrainingTypeForKorean,
} from '@src/functions';
import { Training } from '@src/types/graphql';

import {
  CategoryButton,
  CategoryContainer,
  CloseButton,
  DescriptionContainer,
  Overlay,
  Thumbnail,
  Container,
} from './styled';

type P = {
  training?: Training;
  hide: () => void;
};

const TrainingModal: React.FC<P> = ({ training, hide }) => (
  <Modal
    testID="trainingModal"
    visible={!!training}
    animationType="fade"
    transparent={true}
    presentationStyle="overFullScreen">
    {training && (
      <Overlay
        testID="overlay"
        type="clear"
        onPress={hide}
        node={
          <Container>
            <CloseButton
              testID="closeButton"
              type="clear"
              icon={{ name: 'close' }}
              onPress={hide}
            />
            <Text size={20} weight="bold">
              {getTrainingTypeForKorean(training.type)} | {training.name}
            </Text>
            <Thumbnail
              source={
                training?.thumbnailPath
                  ? { uri: training.thumbnailPath }
                  : require('@src/resources/images/mock.png')
              }
            />
            <CategoryContainer>
              <CategoryButton
                title={getTrainingCategoryForKorean(training.category)}
                size={10}
              />
            </CategoryContainer>
            {training.description && (
              <DescriptionContainer>
                <Text>{training.description}</Text>
              </DescriptionContainer>
            )}
          </Container>
        }
      />
    )}
  </Modal>
);

export default TrainingModal;
