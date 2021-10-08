import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '@src/screens/HomeScreen';
import PlansScreen from '@src/screens/PlansScreen';
import ProfileScreen from '@src/screens/Profile';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icon, useTheme } from 'react-native-elements';

const Tab = createMaterialBottomTabNavigator<MainTabParamList>();

type P = NativeStackScreenProps<RootStackParamList, 'Main'> & {};

const MainNavigation: React.FC<P> = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      shifting={true}
      activeColor={theme.colors?.white}
      inactiveColor={theme.colors?.greyOutline}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ color }) => (
            <Icon name="home" type="oction" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Plans"
        component={PlansScreen}
        options={{
          tabBarLabel: '계획',
          tabBarIcon: 'calendar-today',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '내정보',
          tabBarIcon: ({ color }) => (
            <Icon name="person-circle-outline" type="ionicon" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
