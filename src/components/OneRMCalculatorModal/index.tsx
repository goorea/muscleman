import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal } from 'react-native';

import Icon from '@src/components/Icon';

import useEvents from './hooks/useEvents';
import useOneRM from './hooks/useOneRM';
import useRenders from './hooks/useRenders';
import {
  CloseButton,
  Container,
  Wrapper,
  ModalContainer,
  Overlay,
  ResultText,
  FormWrapper,
  CautionWrapper,
  CautionText,
} from './styled';

export type OneRMCalculatorModalElement = {
  show: () => void;
  hide: () => void;
};

export type OneRMCalculatorFormInput = {
  weight: string;
  count: string;
};

const OneRMCalculatorModal: React.ForwardRefRenderFunction<OneRMCalculatorModalElement> =
  (_, ref) => {
    const { visible, hide } = useEvents(ref);
    const { control, watch, reset } = useForm<OneRMCalculatorFormInput>();
    const { weightRender, countRender } = useRenders();
    const { oneRM } = useOneRM(watch);

    return (
      <Modal
        visible={visible}
        animationType="fade"
        presentationStyle="overFullScreen"
        transparent={true}
        onDismiss={reset}>
        <ModalContainer>
          <Overlay onPress={hide} />

          <Container>
            <CloseButton type="clear" onPress={hide} icon={{ name: 'close' }} />

            <Wrapper>
              <FormWrapper>
                <Controller
                  render={weightRender}
                  name="weight"
                  control={control}
                />
                <Controller
                  render={countRender}
                  name="count"
                  control={control}
                />
              </FormWrapper>

              <ResultText size={24}>1rm = {oneRM}kg</ResultText>

              <CautionWrapper>
                <Icon
                  type="antdesign"
                  name="exclamationcircle"
                  color="error"
                  size={16}
                />
                <CautionText size={12} weight="thin">
                  정확도를 위해 3kg 이상, 10개미만으로 입력해주세요!
                </CautionText>
              </CautionWrapper>
            </Wrapper>
          </Container>
        </ModalContainer>
      </Modal>
    );
  };

export default React.forwardRef(OneRMCalculatorModal);
