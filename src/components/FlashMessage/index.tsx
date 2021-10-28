import React from 'react';
import StackFlashMessage from 'react-native-stack-flash-message';
import { useTheme } from '@src/contexts/ThemeProvider';
import Text from '@src/components/Text';
import useFlashMessageProps from './hooks/useFlashMessageProps';

const FlashMessage: React.FC = () => {
  const { colors } = useTheme();
  const { messageWrapperStyle, theme, icons } = useFlashMessageProps(colors);

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
