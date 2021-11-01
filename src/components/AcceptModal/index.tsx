import React, { useState } from 'react';
import {
  AcceptContainer,
  AcceptText,
  AllAcceptContainer,
  BottomSheet,
  ConfirmButton,
  // DetailIconContainer,
  ModalContainer,
  Overlay,
} from './styled';
import Icon from '@src/components/Icon';
import { Modal } from 'react-native';
import useAnimation from './hooks/useAnimation';

export type AcceptModalElement = {
  show: () => void;
  hide: () => void;
};

type P = {
  onConfirm: () => void;
  loading: boolean;
};

const AcceptModal: React.ForwardRefRenderFunction<AcceptModalElement, P> = (
  { onConfirm, loading },
  ref,
) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);
  const [privacy, setPrivacy] = useState<boolean>(false);
  const { translateY, revert } = useAnimation(visible);
  const onDismiss = () => {
    revert();
    setTerms(false);
    setPrivacy(false);
  };
  const hide = () => setVisible(false);
  const toggleAll = () => {
    setTerms(!(terms && privacy));
    setPrivacy(!(terms && privacy));
  };
  const toggleTerms = () => setTerms(!terms);
  const togglePrivacy = () => setPrivacy(!privacy);

  React.useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    hide,
  }));

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent={true}
      onDismiss={onDismiss}
      onRequestClose={hide}>
      <ModalContainer>
        <Overlay onPress={hide} />

        <BottomSheet style={{ transform: [{ translateY }] }}>
          <AllAcceptContainer onPress={toggleAll}>
            <Icon
              name="checkcircleo"
              type="antdesign"
              color={terms && privacy ? 'primary' : 'grey5'}
              size={28}
            />
            <AcceptText size={18} weight="bold">
              약관에 모두 동의
            </AcceptText>
          </AllAcceptContainer>

          <AcceptContainer onPress={toggleTerms}>
            <Icon
              name="check"
              type="antdesign"
              color={terms ? 'primary' : 'grey5'}
              size={28}
            />
            <AcceptText size={18}>이용약관 동의</AcceptText>
            {/*<DetailIconContainer>
              <Icon name="right" type="antdesign" color="grey4" size={16} />
            </DetailIconContainer>*/}
          </AcceptContainer>

          <AcceptContainer onPress={togglePrivacy}>
            <Icon
              name="check"
              type="antdesign"
              color={privacy ? 'primary' : 'grey5'}
              size={28}
            />
            <AcceptText size={18}>개인정보 처리방침 동의</AcceptText>
            {/*<DetailIconContainer>
              <Icon name="right" type="antdesign" color="grey4" size={16} />
            </DetailIconContainer>*/}
          </AcceptContainer>

          <ConfirmButton
            title="확인"
            disabled={!terms || !privacy}
            onPress={onConfirm}
            loading={loading}
          />
        </BottomSheet>
      </ModalContainer>
    </Modal>
  );
};

export default React.forwardRef(AcceptModal);
