import { APP_NAME } from '@env';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Text from '@src/components/Text';
import { useTheme } from '@src/contexts/ThemeProvider';
import AuthNavigator from '@src/navigations/AuthNavigator';
import MainNavigator from '@src/navigations/MainNavigator';
import { RootStackParamList } from '@src/types/navigation';

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
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppNavigator;
