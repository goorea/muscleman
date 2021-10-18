import React from 'react';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import styled from 'styled-components/native';
import { flexFillCenter } from '@src/styles/flex';
import Text from '@src/components/Text';

const Container = styled.View`
  ${flexFillCenter}
`;

type P = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
> & {};

const HomeScreen: React.FC<P> = ({ navigation }) => (
  <Container>
    <Text>Home Screen</Text>
    <Button
      title="Login"
      onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
    />
  </Container>
);

export default HomeScreen;
