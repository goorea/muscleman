import { Animated } from 'react-native';
import styled from 'styled-components/native';

import BaseButton from '@src/components/Button';
import Text from '@src/components/Text';

export const Container = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 8px 8px 16px;
  background-color: ${({ theme }) => theme.background};
  z-index: 10;
  margin: -4px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Button = styled(BaseButton)`
  padding: 0;
  width: 54px;
  height: 36px;
  border-radius: 6px;
  margin: 4px;
`;

export const SmallButton = styled(BaseButton)`
  width: 50px;
  height: 100%;
  padding: 0;
  border-radius: 4px;
`;

export const ButtonGroup = styled.View<{ dark: boolean }>`
  flex: 1;
  height: 36px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  background-color: ${({ theme, dark }) => (dark ? theme.grey0 : theme.grey5)};
  margin: 4px;
  border-radius: 6px;
`;

export const Value = styled(Text)`
  flex: 1.2;
  margin: 4px;
  text-align: center;
  text-decoration: underline;
`;
