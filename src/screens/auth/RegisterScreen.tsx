import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from '@src/types/navigation';
import { Text } from 'react-native-elements';
import styled from 'styled-components/native';
import { flexFillCenter } from '@src/styles/flex';

const Container = styled.View`
  ${flexFillCenter}
`;

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
