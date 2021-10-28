import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import Text, { TextProps } from '@src/components/Text';
import { useTheme } from '@src/contexts/ThemeProvider';
import Icon, { IconProps } from '@src/components/Icon';
import { StyledButton } from './styled';

type P = TouchableOpacityProps &
  TextProps & {
    title?: string | React.ReactElement;
    icon?: IconProps;
    type?: 'solid' | 'clear' | 'outline';
    loading?: boolean;
    disabled?: boolean;
  };

const Button: React.FC<P> = props => {
  const { colors } = useTheme();

  return (
    <StyledButton {...props}>
      {props.loading ? (
        <ActivityIndicator
          size={props.size || 16}
          color={colors[props.color || 'white']}
        />
      ) : props.title ? (
        <Text
          weight={props.weight || 'bold'}
          color={
            props.type === undefined || props.type === 'solid'
              ? 'white'
              : props.color || 'primary'
          }>
          {props.title}
        </Text>
      ) : (
        props.icon && <Icon {...props.icon} />
      )}
    </StyledButton>
  );
};

export default Button;
