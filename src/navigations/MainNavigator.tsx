import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '@src/screens/HomeScreen';
import PlansScreen from '@src/screens/PlansScreen';
import ProfileScreen from '@src/screens/Profile';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialBottomTabNavigationOptions } from '@react-navigation/material-bottom-tabs/src/types';
import { Icon } from 'react-native-elements';
import { useTheme } from '@src/contexts/ThemeProvider';

const Tab = createMaterialBottomTabNavigator<MainTabParamList>();

type P = NativeStackScreenProps<RootStackParamList, 'Main'> & {};

const MainNavigator: React.FC<P> = () => {
  const { colors } = useTheme();
  const barStyle = { backgroundColor: colors.background };
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
      activeColor={colors.primary}
      inactiveColor={colors.greyOutline}
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

export default MainNavigator;
