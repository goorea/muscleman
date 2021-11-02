import { CompositeScreenProps } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';

import RegisterAccountScreen from '@src/screens/RegisterAccountScreen';
import RegisterUserScreen from '@src/screens/RegisterUserScreen';
import {
  AuthStackParamList,
  RegisterStackParamList,
  RootStackParamList,
} from '@src/types/navigation';

import { StackNavigatorDefaultScreenOptions } from './StackNavigatorDefaultScreenOptions';

const Stack = createNativeStackNavigator<RegisterStackParamList>();

type P = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Register'>,
  NativeStackScreenProps<RootStackParamList>
> & {};

const RegisterNavigator: React.FC<P> = () => (
  <Stack.Navigator screenOptions={StackNavigatorDefaultScreenOptions}>
    <Stack.Screen name="RegisterAccount" component={RegisterAccountScreen} />
    <Stack.Screen name="RegisterUser" component={RegisterUserScreen} />
  </Stack.Navigator>
);

export default RegisterNavigator;
