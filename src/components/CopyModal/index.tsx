import dayjs from 'dayjs';
import React from 'react';
import { Modal } from 'react-native';

import Button from '@src/components/Button';
import PlanCalendar from '@src/components/PlanCalendar';
import Text from '@src/components/Text';
import useDates from '@src/screens/PlansScreen/hooks/useDates';

import useCopy from './hooks/useCopy';
import useEvents from './hooks/useEvents';
import {
  ModalContainer,
  Overlay,
  Container,
  CloseButton,
  Wrapper,
} from './styled';

export type CopyModalElement = {
  show: () => void;
};

type P = {
  selectedDate: string;
};

const CopyModal: React.ForwardRefRenderFunction<CopyModalElement, P> = (
  { selectedDate },
  ref,
) => {
  const { visible, node, hide } = useEvents(ref);
  const { loading, copiedAt, setCopiedAt, handleCopy } = useCopy(
    selectedDate,
    hide,
  );
  const { completeDates, plannedDates } = useDates();

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent={true}>
      <ModalContainer>
        <Overlay onPress={hide} />

        <Container>
          <CloseButton
            testID="closeButton"
            type="clear"
            onPress={hide}
            icon={{ name: 'close' }}
          />

          <Wrapper>
            <Text weight="bold" size={20}>
              {dayjs(selectedDate).format('MMMM D일')} 운동 복사하기
            </Text>
          </Wrapper>

          <PlanCalendar
            selectedDate={copiedAt}
            onSelectDate={setCopiedAt}
            completeDates={[copiedAt]}
            plannedDates={plannedDates}
            disableDates={[...completeDates, selectedDate]}
          />

          <Wrapper>
            <Button
              node={node}
              onPress={handleCopy}
              disabled={dayjs(copiedAt).isSame(selectedDate, 'day')}
              loading={loading}
            />
          </Wrapper>
        </Container>
      </ModalContainer>
    </Modal>
  );
};

export default React.forwardRef(CopyModal);
