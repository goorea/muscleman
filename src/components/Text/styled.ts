import styled from 'styled-components/native';

import { fonts } from '@src/theme';

import { TextProps } from './index';

export const StyledText = styled.Text<Omit<TextProps, 'style'>>`
  font-family: ${({ weight }) => fonts[weight || 'normal']};
  font-size: ${({ size }) => `${size || 16}px`};
  color: ${({ theme, color }) => theme[color || 'foreground']};
`;
