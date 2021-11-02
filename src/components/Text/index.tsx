import React from 'react';
import { TextStyle } from 'react-native';

import { Colors } from '@src/types/theme';

import { StyledText } from './styled';

export type TextProps = {
  weight?: 'normal' | 'bold' | 'thin';
  size?: number;
  color?: keyof Colors;
  style?: TextStyle;
  ellipsis?: boolean;
};

const Text: React.FC<TextProps> = ({
  weight,
  size,
  color,
  style,
  ellipsis = false,
  children,
}) => (
  <StyledText
    weight={weight}
    size={size}
    color={color}
    style={style}
    numberOfLines={ellipsis ? 1 : undefined}>
    {children}
  </StyledText>
);

export default Text;
