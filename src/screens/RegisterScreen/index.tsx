import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from '@src/types/navigation';
import Text from '@src/components/Text';
import { Container } from './styled';

type P = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Login'>,
  NativeStackScreenProps<RootStackParamList>
> & {};

const RegisterScreen: React.FC<P> = () => (
  <Container>
    <Text>Register Screen</Text>
  </Container>
);

export default RegisterScreen;
