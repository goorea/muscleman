import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import LoginScreen from '@src/screens/auth/LoginScreen';
import RegisterScreen from '@src/screens/auth/RegisterScreen';
import { RootStackParamList } from '@src/types/navigation';
import { StackNavigatorDefaultScreenOptions } from '@src/navigations/StackNavigatorDefaultScreenOptions';
import SuccessModalScreen from '@src/screens/auth/SuccessModalScreen';

const Stack = createNativeStackNavigator();

type P = NativeStackScreenProps<RootStackParamList, 'Main'> & {};

const AuthNavigator: React.FC<P> = () => (
  <Stack.Navigator screenOptions={StackNavigatorDefaultScreenOptions}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />

    <Stack.Group screenOptions={{ headerShown: false, presentation: 'modal' }}>
      <Stack.Screen name="SuccessModal" component={SuccessModalScreen} />
    </Stack.Group>
  </Stack.Navigator>
);

export default AuthNavigator;
