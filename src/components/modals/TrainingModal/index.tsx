import React from 'react';

import Text from '@src/components/Text';
import DefaultModal, {
  DefaultModalElement,
} from '@src/components/modals/DefaultModal';
import {
  getTrainingCategoryForKorean,
  getTrainingTypeForKorean,
} from '@src/functions';
import { Training } from '@src/types/graphql';

import {
  Container,
  CategoryButton,
  CategoryContainer,
  DescriptionContainer,
  Thumbnail,
} from './styled';

export type TrainingModalElement = DefaultModalElement & {};

type P = {
  training?: Training;
  hide: () => void;
};

const TrainingModal: React.ForwardRefRenderFunction<TrainingModalElement, P> = (
  { training },
  ref,
) => (
  <DefaultModal ref={ref} testID="trainingModal">
    {training && (
      <Container>
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
        {!!training.description && (
          <DescriptionContainer>
            <Text>{training.description}</Text>
          </DescriptionContainer>
        )}
      </Container>
    )}
  </DefaultModal>
);

export default React.forwardRef(TrainingModal);
