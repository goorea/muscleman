import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

import { MainTabParamList, RootStackParamList } from '@src/types/navigation';

const useEvents = (
  navigation: CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, 'Plans'>,
    NativeStackScreenProps<RootStackParamList>
  >['navigation'],
): {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onPlanning: () => void;
} => {
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format('YYYY-MM-DD'),
  );

  return {
    selectedDate,
    onSelectDate: useCallback(
      (date: string) => setSelectedDate(date),
      [setSelectedDate],
    ),
    onPlanning: useCallback(
      () =>
        navigation.navigate('Planning', {
          screen: 'EditPlan',
          params: {
            plannedAt: selectedDate,
          },
        }),
      [navigation, selectedDate],
    ),
  };
};

export default useEvents;
