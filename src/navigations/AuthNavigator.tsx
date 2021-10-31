import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import LoginScreen from '@src/screens/LoginScreen';
import { AuthStackParamList, RootStackParamList } from '@src/types/navigation';
import { StackNavigatorDefaultScreenOptions } from './StackNavigatorDefaultScreenOptions';
import SuccessModalScreen from '@src/screens/SuccessModalScreen';
import RegisterNavigator from './RegisterNavigator';
import { RouteGroupConfig } from '@react-navigation/native';

const Stack = createNativeStackNavigator<AuthStackParamList>();

type P = NativeStackScreenProps<RootStackParamList, 'Auth'> & {};

const AuthNavigator: React.FC<P> = () => {
  const registerOptions = { headerShown: false };
  const modalScreenOptions: RouteGroupConfig<
    AuthStackParamList,
    {}
  >['screenOptions'] = { headerShown: false, presentation: 'modal' };

  return (
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={StackNavigatorDefaultScreenOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Register"
        options={registerOptions}
        component={RegisterNavigator}
      />

      <Stack.Group screenOptions={modalScreenOptions}>
        <Stack.Screen name="SuccessModal" component={SuccessModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
