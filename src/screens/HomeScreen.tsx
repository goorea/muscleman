import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { Button, Text } from 'react-native-elements';

type P = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
> & {};

const HomeScreen: React.FC<P> = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Home Screen</Text>
    <Button
      title="Login"
      onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
