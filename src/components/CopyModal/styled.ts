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
  opacity: 0.4;
  background-color: ${({ theme }) => theme.foreground};
`;

export const Container = styled.View`
  width: 95%;
  background-color: ${({ theme }) => theme.background};
`;

export const Wrapper = styled.View`
  padding: 20px;
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
`;

export const CopyButtonBody = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CopyButtonTitle = styled(Text)`
  margin-left: 4px;
`;
