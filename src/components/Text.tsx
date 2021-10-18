import React from 'react';
import styled from 'styled-components/native';
import { TextStyle } from 'react-native';
import { fonts } from '@src/theme';
import { Colors } from '@src/types/theme';

export type TextProps = {
  weight?: 'normal' | 'bold' | 'thin';
  size?: number;
  color?: keyof Colors;
  style?: TextStyle;
  ellipsis?: boolean;
};

const RNText = styled.Text<Omit<TextProps, 'style'>>`
  font-family: ${({ weight }) => fonts[weight || 'normal']};
  font-size: ${({ size }) => `${size || 16}px`};
  color: ${({ theme, color }) => theme[color || 'foreground']};
`;

const Text: React.FC<TextProps> = ({
  weight,
  size,
  color,
  style,
  ellipsis = false,
  children,
}) => {
  return (
    <RNText
      weight={weight}
      size={size}
      color={color}
      style={style}
      numberOfLines={ellipsis ? 1 : undefined}>
      {children}
    </RNText>
  );
};

export default Text;
