import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@src/screens/HomeScreen';
import PlansScreen from '@src/screens/PlansScreen';
import ProfileScreen from '@src/screens/Profile';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icon, useTheme } from 'react-native-elements';
import { IconProps } from 'react-native-elements/dist/icons/Icon';

const Tab = createBottomTabNavigator<MainTabParamList>();

type P = NativeStackScreenProps<RootStackParamList, 'Main'> & {};

const MainNavigation: React.FC<P> = () => {
  const { theme } = useTheme();
  const getIcon = (
    type: 'home' | 'plans' | 'profile',
    focused: boolean,
  ): React.ReactNode => {
    let iconProps: IconProps = {
      name: '',
      color: focused ? theme.colors?.primary : theme.colors?.greyOutline,
      type: undefined,
    };

    switch (type) {
      case 'home':
        iconProps.name = 'home';
        iconProps.type = 'oction';
        break;
      case 'plans':
        iconProps.name = 'calendar-today';
        break;
      case 'profile':
        iconProps.name = 'person-circle-outline';
        iconProps.type = 'ionicon';
        break;
    }

    return <Icon {...iconProps} />;
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ focused }) => getIcon('home', focused),
        }}
      />
      <Tab.Screen
        name="Plans"
        component={PlansScreen}
        options={{
          tabBarLabel: '계획',
          tabBarIcon: ({ focused }) => getIcon('plans', focused),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '내정보',
          tabBarIcon: ({ focused }) => getIcon('profile', focused),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
