import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';

import { MainTabParamList, RootStackParamList } from '@src/types/navigation';

const useEvents = ({
  navigation,
  route,
}: CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Plans'>,
  NativeStackScreenProps<RootStackParamList>
>): {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onPlanning: () => void;
} => {
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format('YYYY-MM-DD'),
  );

  const navigateEditPlan = useCallback(
    (plannedAt: string) =>
      navigation.navigate('Planning', {
        screen: 'EditPlan',
        params: {
          plannedAt,
        },
      }),
    [navigation],
  );

  const onSelectDate = useCallback(
    (date: string) => setSelectedDate(date),
    [setSelectedDate],
  );

  const onPlanning = useCallback(
    () => navigateEditPlan(selectedDate),
    [navigateEditPlan, selectedDate],
  );

  useEffect(() => {
    if (route.params?.plannedAt) {
      onSelectDate(route.params.plannedAt);
      navigateEditPlan(route.params.plannedAt);
      navigation.setParams({ plannedAt: undefined });
    }
  }, [navigateEditPlan, navigation, onSelectDate, route.params?.plannedAt]);

  return {
    selectedDate,
    onSelectDate,
    onPlanning,
  };
};

export default useEvents;
