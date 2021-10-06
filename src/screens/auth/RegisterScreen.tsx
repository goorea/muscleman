import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from '@src/types/navigation';

type P = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Login'>,
  NativeStackScreenProps<RootStackParamList>
> & {};

const RegisterScreen: React.FC<P> = () => (
  <View style={styles.container}>
    <Text>Register Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegisterScreen;
