import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';

import Icon, { IconProps } from '@src/components/Icon';
import Text, { TextProps } from '@src/components/Text';
import { useTheme } from '@src/contexts/ThemeProvider';
import { Colors } from '@src/types/theme';

import { StyledButton } from './styled';

type P = TouchableOpacityProps &
  Pick<TextProps, 'weight' | 'size'> & {
    title?: string | React.ReactElement;
    icon?: IconProps;
    type?: 'solid' | 'clear' | 'outline';
    titleColor?: keyof Colors;
    color?: keyof Colors;
    loading?: boolean;
    disabled?: boolean;
  };

const Button: React.FC<P> = props => {
  const {
    weight = 'bold',
    size = 16,
    title,
    icon,
    type = 'solid',
    titleColor = 'white',
    color = 'primary',
    loading,
  } = props;
  const { colors } = useTheme();

  return (
    <StyledButton {...props}>
      {loading ? (
        <ActivityIndicator size={size} color={colors[titleColor]} />
      ) : title ? (
        <Text
          weight={weight}
          color={type === undefined || type === 'solid' ? titleColor : color}>
          {title}
        </Text>
      ) : (
        icon && <Icon {...icon} />
      )}
    </StyledButton>
  );
};

export default Button;
