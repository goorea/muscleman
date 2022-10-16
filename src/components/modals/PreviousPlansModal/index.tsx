import dayjs from 'dayjs';
import React from 'react';

import Button from '@src/components/Button';
import Text from '@src/components/Text';
import DefaultModal, {
  DefaultModalElement,
} from '@src/components/modals/DefaultModal';

import useFlatList from './hooks/useFlatList';
import { Container, FlatListWrapper, StyledFlatList } from './styled';

export type PreviousPlansModalElement = DefaultModalElement & {};

type P = {
  plannedAt: string;
  onLoad: () => void;
};

const PreviousPlansModal: React.ForwardRefRenderFunction<
  PreviousPlansModalElement,
  P
> = ({ plannedAt, onLoad }, ref) => {
  const { groupByPlans, keyExtractor, renderItem } = useFlatList(plannedAt);

  return (
    <DefaultModal ref={ref}>
      <Container>
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

      <Button title="불러오기" onPress={onLoad} />
    </DefaultModal>
  );
};

export default React.forwardRef(PreviousPlansModal);
