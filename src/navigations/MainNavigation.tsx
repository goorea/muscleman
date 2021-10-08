import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '@src/screens/HomeScreen';
import PlansScreen from '@src/screens/PlansScreen';
import ProfileScreen from '@src/screens/Profile';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icon, useTheme } from 'react-native-elements';
import { MaterialBottomTabNavigationOptions } from '@react-navigation/material-bottom-tabs/src/types';

const Tab = createMaterialBottomTabNavigator<MainTabParamList>();

type P = NativeStackScreenProps<RootStackParamList, 'Main'> & {};

const MainNavigation: React.FC<P> = () => {
  const { theme } = useTheme();
  const barStyle = { backgroundColor: theme.colors?.white };
  const homeOptions: MaterialBottomTabNavigationOptions = {
    tabBarLabel: '홈',
    tabBarIcon: ({ color }) => <Icon name="home" type="oction" color={color} />,
  };
  const plansOptions: MaterialBottomTabNavigationOptions = {
    tabBarLabel: '계획',
    tabBarIcon: 'calendar-today',
  };
  const profileOptions: MaterialBottomTabNavigationOptions = {
    tabBarLabel: '내정보',
    tabBarIcon: ({ color }) => (
      <Icon name="person-circle-outline" type="ionicon" color={color} />
    ),
  };

  return (
    <Tab.Navigator
      shifting={true}
      activeColor={theme.colors?.primary}
      inactiveColor={theme.colors?.greyOutline}
      barStyle={barStyle}>
      <Tab.Screen name="Home" component={HomeScreen} options={homeOptions} />
      <Tab.Screen name="Plans" component={PlansScreen} options={plansOptions} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={profileOptions}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
