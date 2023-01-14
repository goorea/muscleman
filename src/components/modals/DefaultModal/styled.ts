import styled from 'styled-components/native';

import Button from '@src/components/Button';
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
  width: 90%;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
`;
