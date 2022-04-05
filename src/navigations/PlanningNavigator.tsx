import { CompositeScreenProps } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';

import AddTrainingScreen from '@src/screens/AddTrainingScreen';
import EditPlanScreen from '@src/screens/EditPlanScreen';
import {
  MainTabParamList,
  PlanningStackParamList,
  RootStackParamList,
} from '@src/types/navigation';

import { StackNavigatorDefaultScreenOptions } from './StackNavigatorDefaultScreenOptions';

const Stack = createNativeStackNavigator<PlanningStackParamList>();

type P = CompositeScreenProps<
  NativeStackScreenProps<MainTabParamList, 'Plans'>,
  NativeStackScreenProps<RootStackParamList>
>;

const PlanningNavigator: React.FC<P> = () => (
  <Stack.Navigator screenOptions={StackNavigatorDefaultScreenOptions}>
    <Stack.Screen name="EditPlan" component={EditPlanScreen} />
    <Stack.Screen name="AddTraining" component={AddTrainingScreen} />
  </Stack.Navigator>
);

export default PlanningNavigator;
