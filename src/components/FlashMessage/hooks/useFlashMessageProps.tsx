import Icon from '@src/components/Icon';
import React from 'react';
import { Colors } from '@src/types/theme';
import { ViewStyle } from 'react-native';
import {
  Theme as StackFlashMessageTheme,
  Icon as StackFlashMessageIcon,
} from 'react-native-stack-flash-message';

const useFlashMessageProps = (
  colors: Colors,
): {
  messageWrapperStyle: ViewStyle;
  theme: StackFlashMessageTheme;
  icons: StackFlashMessageIcon;
} => ({
  messageWrapperStyle: {
    borderWidth: 1,
    borderColor: colors.greyOutline,
    backgroundColor: colors.background,
  },
  theme: {
    success: colors.primary,
    info: colors.success,
    error: colors.error,
  },
  icons: {
    success: (
      <Icon
        name="checkmark-circle-outline"
        size={20}
        color="primary"
        type="ionicon"
      />
    ),
    info: (
      <Icon
        name="information-circle-outline"
        size={20}
        color="success"
        type="ionicon"
      />
    ),
    error: (
      <Icon
        name="close-circle-outline"
        size={20}
        color="error"
        type="ionicon"
      />
    ),
  },
});

export default useFlashMessageProps;
