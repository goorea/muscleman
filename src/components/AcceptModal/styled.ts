import styled from 'styled-components/native';
import { positionAbsoluteFill } from '@src/styles/position';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import { Animated } from 'react-native';

export const ModalContainer = styled.View`
  flex: 1;
`;

export const Overlay = styled.TouchableOpacity`
  ${positionAbsoluteFill};
  opacity: 0.4;
  background-color: ${({ theme }) => theme.foreground};
`;

export const BottomSheet = styled(Animated.View)`
  margin-top: auto;
  padding: 30px;
  background-color: ${({ theme }) => theme.background};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const AllAcceptContainer = styled.TouchableOpacity`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.grey5};
  padding: 20px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const AcceptContainer = styled.TouchableOpacity`
  padding: 10px 0 10px 22px;
  flex-direction: row;
  align-items: center;
`;

export const AcceptText = styled(Text)`
  margin-left: 10px;
`;

export const DetailIconContainer = styled.TouchableOpacity`
  margin-left: auto;
  padding: 5px;
`;

export const ConfirmButton = styled(Button)`
  margin-top: 80px;
  border-radius: 10px;
`;
