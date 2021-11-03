import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import Button from '@src/components/Button';
import Text from '@src/components/Text';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';

import { Container } from './styled';

type P = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

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
