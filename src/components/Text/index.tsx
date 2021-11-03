import { isEqual } from 'lodash';
import React from 'react';
import { TextStyle } from 'react-native';

import { Colors } from '@src/types/theme';

import { StyledText } from './styled';

export type TextProps = {
  children: React.ReactNode;
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

export default React.memo<TextProps>(Text, isEqual);
