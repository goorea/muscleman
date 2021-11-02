import analytics from '@react-native-firebase/analytics';
import {
  NavigationContainer as ReactNavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React, { useRef } from 'react';

import { useTheme } from '@src/contexts/ThemeProvider';
import { RootStackParamList } from '@src/types/navigation';

const NavigationContainer: React.FC = ({ children }) => {
  const { dark, colors } = useTheme();
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  const navigationTheme = {
    dark,
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.background,
      text: colors.foreground,
      border: colors.divider,
      notification: colors.error,
    },
  };
  const routeNameRef = useRef<string>();
  const onReady = () =>
    (routeNameRef.current = navigationRef.getCurrentRoute()?.name);
  const onStateChange = async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName) {
      await analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });
    }

    routeNameRef.current = currentRouteName;
  };

  return (
    <ReactNavigationContainer
      ref={navigationRef}
      theme={navigationTheme}
      onReady={onReady}
      onStateChange={onStateChange}>
      {children}
    </ReactNavigationContainer>
  );
};

export default NavigationContainer;
