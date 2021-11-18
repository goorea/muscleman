import { APP_NAME } from '@env';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Text from '@src/components/Text';
import { useTheme } from '@src/contexts/ThemeProvider';
import { RootStackParamList } from '@src/types/navigation';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import PlanningNavigator from './PlanningNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { colors } = useTheme();
  const options = {
    title: '',
    headerLeft: () => <Text weight="bold">💪{APP_NAME}</Text>,
    headerStyle: { backgroundColor: colors.background },
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainNavigator} options={options} />

      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Planning" component={PlanningNavigator} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppNavigator;
