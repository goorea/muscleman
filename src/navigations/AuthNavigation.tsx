import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import LoginScreen from '@src/screens/auth/LoginScreen';
import RegisterScreen from '@src/screens/auth/RegisterScreen';
import { RootStackParamList } from '@src/types/navigation';

const Stack = createNativeStackNavigator();

type P = NativeStackScreenProps<RootStackParamList, 'Main'> & {};

const AuthNavigation: React.FC<P> = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthNavigation;