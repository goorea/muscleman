import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native-elements';
import styled from 'styled-components/native';
import { flexFillCenter } from '@src/styles/flex';

const Container = styled.View`
  ${flexFillCenter}
`;

type P = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
> & {};

const ProfileScreen: React.FC<P> = () => (
  <Container>
    <Text>Profile Screen</Text>
  </Container>
);

export default ProfileScreen;
