import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import styled, { css } from 'styled-components/native';
import Text, { TextProps } from '@src/components/Text';
import { useTheme } from '@src/contexts/ThemeProvider';

type P = TouchableOpacityProps &
  TextProps & {
    title: string;
    type?: 'solid' | 'clear' | 'outline';
    loading?: boolean;
    disabled?: boolean;
  };

const RNTouchableOpacity = styled.TouchableOpacity<P>`
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
  padding: ${({ type }) => (type === 'clear' ? 0 : '6px 12px')};
`;

const Button: React.FC<P> = props => {
  const { colors } = useTheme();

  return (
    <RNTouchableOpacity {...props}>
      {props.loading ? (
        <ActivityIndicator
          size={props.size || 16}
          color={colors[props.color || 'primary']}
        />
      ) : (
        <Text
          weight={props.weight || 'bold'}
          color={
            props.type === undefined || props.type === 'solid'
              ? 'white'
              : props.color || 'primary'
          }>
          {props.title}
        </Text>
      )}
    </RNTouchableOpacity>
  );
};

export default Button;
