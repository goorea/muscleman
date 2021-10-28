import React from 'react';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import { Container } from './styled';

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
