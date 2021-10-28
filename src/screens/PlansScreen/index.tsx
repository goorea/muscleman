import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Text from '@src/components/Text';
import { Container } from './styled';

type P = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Plans'>,
  NativeStackScreenProps<RootStackParamList>
> & {};

const PlansScreen: React.FC<P> = () => (
  <Container>
    <Text>Plans Screen</Text>
  </Container>
);

export default PlansScreen;
