import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from '@src/navigations/MainNavigation';
import AuthNavigation from '@src/navigations/AuthNavigation';
import { RootStackParamList } from '@src/types/navigation';
import { Text, useTheme } from 'react-native-elements';
import { fonts } from '@src/theme';
import { APP_NAME } from '@env';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const {
    theme: { colors },
  } = useTheme();
  const options = {
    title: '',
    headerLeft: () => <Text style={styles.brand}>💪{APP_NAME}</Text>,
    headerStyle: { backgroundColor: colors?.white },
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainNavigation} options={options} />

      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthNavigation} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  brand: {
    fontFamily: fonts.bold,
  },
});

export default AppNavigator;
