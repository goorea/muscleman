import React, { useEffect } from 'react';

import Text from '@src/components/Text';
import DefaultModal, {
  DefaultModalElement,
} from '@src/components/modals/DefaultModal';
import useDefaultModal from '@src/components/modals/DefaultModal/hooks/useDefaultModal';

import { ButtonWrapper, MessageContainer, StyledButton } from './styled';

export type ConfirmModalElement = DefaultModalElement & {};

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
  const { defaultModalRef, visible, hide } = useDefaultModal(ref);

  useEffect(() => {
    if (!visible) {
      onCancel();
    }
  }, [onCancel, visible]);

  return (
    <DefaultModal ref={defaultModalRef}>
      <MessageContainer>
        <Text>{message}</Text>
      </MessageContainer>

      <ButtonWrapper>
        <StyledButton title={cancelText} onPress={hide} type="clear" />
        <StyledButton
          title={confirmText}
          onPress={onConfirm}
          loading={loading}
        />
      </ButtonWrapper>
    </DefaultModal>
  );
};

export default React.forwardRef(ConfirmModal);
