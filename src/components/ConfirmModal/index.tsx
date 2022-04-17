import React from 'react';
import { Modal } from 'react-native';

import Text from '@src/components/Text';

import useEvents from './hooks/useEvents';
import {
  ButtonWrapper,
  CloseButton,
  Container,
  MessageContainer,
  ModalContainer,
  Overlay,
  StyledButton,
} from './styled';

export type ConfirmModalElement = {
  show: () => void;
  hide: () => void;
};

type P = {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
};

const ConfirmModal: React.ForwardRefRenderFunction<ConfirmModalElement, P> = (
  {
    message,
    onConfirm,
    onCancel = () => null,
    confirmText = '확인',
    cancelText = '취소',
    loading = false,
  },
  ref,
) => {
  const { visible, hide } = useEvents(ref, onCancel);

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

          <MessageContainer>
            <Text>{message}</Text>
          </MessageContainer>

          <ButtonWrapper>
            <StyledButton title={cancelText} onPress={hide} type="outline" />
            <StyledButton
              title={confirmText}
              onPress={onConfirm}
              loading={loading}
            />
          </ButtonWrapper>
        </Container>
      </ModalContainer>
    </Modal>
  );
};

export default React.forwardRef(ConfirmModal);
