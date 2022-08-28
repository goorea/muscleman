import { Animated } from 'react-native';
import styled from 'styled-components/native';

import { fonts } from '@src/theme';
import { Colors } from '@src/types/theme';

export const Container = styled.View``;

export const Wrapper = styled.View`
  margin-bottom: 4px;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.greyOutline};
  align-items: baseline;
`;

export const Label = styled(Animated.Text)<{ color: keyof Colors }>`
  font-family: ${fonts.normal};
  font-size: 16px;
  color: ${({ theme, color }) => theme[color]};
`;

export const Input = styled.TextInput`
  font-family: ${fonts.normal};
  font-size: 16px;
  color: ${({ theme }) => theme.foreground};
  padding: 0;
  width: 100%;
`;
