import React from 'react';
import StackFlashMessage from 'react-native-stack-flash-message';
import { Icon } from 'react-native-elements';
import { useTheme } from '@src/contexts/ThemeProvider';
import Text from '@src/components/Text';

const FlashMessage: React.FC = () => {
  const { colors } = useTheme();
  const messageWrapperStyle = {
    borderWidth: 1,
    borderColor: colors.greyOutline,
    backgroundColor: colors.background,
  };
  const theme = {
    success: colors.primary,
    info: colors.success,
    error: colors.error,
  };
  const icons = {
    success: (
      <Icon
        name="checkmark-circle-outline"
        size={20}
        color={colors.primary}
        type="ionicon"
      />
    ),
    info: (
      <Icon
        name="information-circle-outline"
        size={20}
        color={colors.success}
        type="ionicon"
      />
    ),
    error: (
      <Icon
        name="close-circle-outline"
        size={20}
        color={colors.error}
        type="ionicon"
      />
    ),
  };

  return (
    <StackFlashMessage
      ref={ref => StackFlashMessage.setRef(ref)}
      messageWrapperStyle={messageWrapperStyle}
      titleComponent={Text}
      contentsComponent={Text}
      theme={theme}
      icons={icons}
    />
  );
};

export default FlashMessage;
