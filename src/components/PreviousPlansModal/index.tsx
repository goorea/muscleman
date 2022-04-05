import dayjs from 'dayjs';
import React from 'react';
import { Modal } from 'react-native';

import Text from '@src/components/Text';

import useEvents from './hooks/useEvents';
import useFlatList from './hooks/useFlatList';
import {
  CloseButton,
  Container,
  FlatListWrapper,
  LoadButton,
  ModalContainer,
  Overlay,
  StyledFlatList,
} from './styled';

export type PreviousPlansModalElement = {
  show: () => void;
  hide: () => void;
};

type P = {
  plannedAt: string;
  onLoad: () => void;
};

const PreviousPlansModal: React.ForwardRefRenderFunction<
  PreviousPlansModalElement,
  P
> = ({ plannedAt, onLoad }, ref) => {
  const { groupByPlans, keyExtractor, renderItem } = useFlatList(plannedAt);
  const { visible, hide } = useEvents(ref);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent={true}>
      <ModalContainer>
        <Overlay onPress={hide} />

        <Container>
          <CloseButton type="clear" onPress={hide} icon={{ name: 'close' }} />
          <Text size={20} weight="bold">
            이전 계획 불러오기
          </Text>
          <Text>{dayjs(plannedAt).format('MMMM D일 dddd')}</Text>

          <FlatListWrapper>
            <StyledFlatList<React.ElementType>
              showsVerticalScrollIndicator={false}
              data={Object.entries(groupByPlans)}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          </FlatListWrapper>
        </Container>

        <LoadButton title="불러오기" onPress={onLoad} />
      </ModalContainer>
    </Modal>
  );
};

export default React.forwardRef(PreviousPlansModal);
