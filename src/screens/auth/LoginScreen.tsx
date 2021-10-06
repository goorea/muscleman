import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { AuthStackParamList, RootStackParamList } from '@src/types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type P = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Login'>,
  NativeStackScreenProps<RootStackParamList>
> & {};

const LoginScreen: React.FC<P> = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Login Screen</Text>
    <Button title="Register" onPress={() => navigation.navigate('Register')} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
