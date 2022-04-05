import styled from 'styled-components/native';

import Button from '@src/components/Button';
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
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: 5px;
  right: 5px;
`;

export const FlatListWrapper = styled.View`
  margin-top: 20px;
`;

export const StyledFlatList = styled.FlatList`
  max-height: 500px;
`;

export const LoadButton = styled(Button)`
  width: 95%;
`;
