import React, { useRef } from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from '@src/navigations/MainNavigation';
import AuthNavigation from '@src/navigations/AuthNavigation';
import { RootStackParamList } from '@src/types/navigation';
import { Text, useTheme } from 'react-native-elements';
import { fonts } from '@src/theme';
import { APP_NAME } from '@env';
import { StyleSheet, useColorScheme } from 'react-native';
import analytics from '@react-native-firebase/analytics';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  const { theme } = useTheme();
  const dark = useColorScheme() === 'dark';
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
  const headerLeft = () => <Text style={styles.brand}>💪{APP_NAME}</Text>;
  const headerStyle = { backgroundColor: theme.colors?.white };
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
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
    <NavigationContainer
      ref={navigationRef}
      theme={navigationTheme}
      onReady={onReady}
      onStateChange={onStateChange}>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainNavigation}
          options={{
            title: '',
            headerLeft,
            headerStyle,
          }}
        />
        <Stack.Screen
          name="Auth"
          component={AuthNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  brand: {
    fontFamily: fonts.bold,
  },
});

export default Navigation;
