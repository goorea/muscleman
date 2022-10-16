import React, { MutableRefObject, ReactNode } from 'react';
import { Modal, ModalProps } from 'react-native';

import useEvents from './hooks/useEvents';
import { CloseButton, Container, ModalContainer, Overlay } from './styled';

export type DefaultModalElement = {
  visible: boolean;
  show: () => void;
  hide: () => void;
  switches: (target: MutableRefObject<DefaultModalElement | null>) => void;
};

type P = ModalProps & {
  children: ReactNode;
};

const DefaultModal: React.ForwardRefRenderFunction<DefaultModalElement, P> = (
  { children, ...props },
  ref,
) => {
  const { visible, hide } = useEvents(ref);

  return (
    <Modal
      {...props}
      visible={visible}
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent={true}
      onRequestClose={hide}>
      <ModalContainer>
        <Overlay testID="overlay" onPress={hide} />

        <Container>
          <CloseButton
            testID="closeButton"
            type="clear"
            onPress={hide}
            icon={{ name: 'close', size: 18 }}
          />

          {children}
        </Container>
      </ModalContainer>
    </Modal>
  );
};

export default React.forwardRef(DefaultModal);
