import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  AuthStackParamList,
  RegisterStackParamList,
  RootStackParamList,
} from '@src/types/navigation';
import React from 'react';
import { StackNavigatorDefaultScreenOptions } from './StackNavigatorDefaultScreenOptions';
import RegisterAccountScreen from '@src/screens/RegisterAccountScreen';
import RegisterUserScreen from '@src/screens/RegisterUserScreen';
import { CompositeScreenProps } from '@react-navigation/native';

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
