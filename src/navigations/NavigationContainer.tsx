import React, { useRef } from 'react';
import {
  NavigationContainer as ReactNavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { RootStackParamList } from '@src/types/navigation';
import analytics from '@react-native-firebase/analytics';
import { useTheme } from 'react-native-elements';
import { useColorScheme } from 'react-native';

const NavigationContainer: React.FC = ({ children }) => {
  const { theme } = useTheme();
  const dark = useColorScheme() === 'dark';
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  const navigationTheme = {
    dark,
    colors: {
      primary: theme.colors?.primary || '',
      background: theme.colors?.white || '',
      card: theme.colors?.white || '',
      text: theme.colors?.black || '',
      border: theme.colors?.divider || '',
      notification: theme.colors?.error || '',
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
