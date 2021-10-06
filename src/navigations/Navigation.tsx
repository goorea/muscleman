import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from '@src/navigations/MainNavigation';
import AuthNavigation from '@src/navigations/AuthNavigation';
import { RootStackParamList } from '@src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Auth"
        component={AuthNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
