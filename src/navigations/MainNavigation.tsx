import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@src/screens/HomeScreen';
import PlansScreen from '@src/screens/PlansScreen';
import ProfileScreen from '@src/screens/Profile';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator<MainTabParamList>();

type P = NativeStackScreenProps<RootStackParamList, 'Main'> & {};

const MainNavigation: React.FC<P> = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Plans" component={PlansScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigation;
