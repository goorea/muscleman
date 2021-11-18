import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import Text from '@src/components/Text';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';

import { Container } from './styled';

type P = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Plans'>,
  NativeStackScreenProps<RootStackParamList>
>;

const EditPlanScreen: React.FC<P> = () => (
  <Container>
    <Text>EditPlan Screen</Text>
  </Container>
);

export default EditPlanScreen;
