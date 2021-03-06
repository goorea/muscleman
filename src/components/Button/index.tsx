import { isEqual } from 'lodash';
import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';

import Icon, { IconProps } from '@src/components/Icon';
import Text, { TextProps } from '@src/components/Text';
import { useTheme } from '@src/contexts/ThemeProvider';
import { Colors } from '@src/types/theme';

import { StyledButton } from './styled';

type P = TouchableOpacityProps &
  Pick<TextProps, 'weight' | 'size'> & {
    title?: string;
    icon?: IconProps;
    node?: React.ReactNode;
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
    node,
    type = 'solid',
    titleColor,
    color = 'primary',
    loading,
  } = props;
  const { colors } = useTheme();

  return (
    <StyledButton {...props}>
      {loading ? (
        <ActivityIndicator size={size} color={colors[titleColor || 'white']} />
      ) : title ? (
        <Text
          size={size}
          weight={weight}
          color={
            type === 'solid'
              ? titleColor || 'white'
              : type === 'outline'
              ? titleColor || color
              : color
          }>
          {title}
        </Text>
      ) : icon ? (
        <Icon {...icon} />
      ) : (
        node && node
      )}
    </StyledButton>
  );
};

export default React.memo<P>(Button, isEqual);
