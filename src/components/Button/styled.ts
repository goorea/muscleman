import styled, { css } from 'styled-components/native';

import { flexCenter } from '@src/styles/flex';
import { Colors } from '@src/types/theme';

export const StyledButton = styled.TouchableOpacity<{
  color?: keyof Colors;
  type?: 'solid' | 'clear' | 'outline';
  disabled?: boolean;
}>`
  ${({ type = 'solid', theme, color }) =>
    type === 'solid'
      ? css`
          background-color: ${theme[color || 'primary']};
        `
      : type === 'outline' &&
        css`
          border: 1px solid ${theme[color || 'primary']};
        `}

  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  padding: ${({ type }) => (type === 'clear' ? 0 : '14px 20px')};
  ${flexCenter};
`;
