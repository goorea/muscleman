import styled from 'styled-components/native';

import Button from '@src/components/Button';
import Text from '@src/components/Text';
import { flexFillCenter } from '@src/styles/flex';
import { positionAbsoluteFill } from '@src/styles/position';

export const ModalContainer = styled.View`
  ${flexFillCenter};
`;

export const Overlay = styled.TouchableOpacity`
  ${positionAbsoluteFill};
  opacity: 0.6;
  background-color: ${({ theme }) => theme.foreground};
`;

export const Container = styled.View`
  width: 85%;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
`;

export const Wrapper = styled.View`
  padding: 20px;
`;

export const FormWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const InputWrapper = styled.View<{ isFirst?: boolean }>`
  flex: 1;
  margin-right: ${({ isFirst }) => (isFirst ? 10 : 0)}px;
`;

export const ResultText = styled(Text)`
  margin-top: 10px;
  text-align: center;
`;

export const CautionWrapper = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;

export const CautionText = styled(Text)`
  margin-left: 5px;
  margin-top: 1px;
`;
