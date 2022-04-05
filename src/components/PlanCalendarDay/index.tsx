import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { Props as DayProps } from 'react-native-easy-calendar/src/Components/Day';

import { Day } from './styled';

type P = DayProps & {
  completeDates: string[];
  plannedDates: string[];
};

const PlanCalendarDay: React.FC<P> = ({
  date,
  onPress,
  completeDates,
  plannedDates,
  isDisabled = false,
  isSelected = false,
  isExtraDay = false,
}) => {
  const _onPress = useCallback(() => onPress(date), [onPress, date]);
  const predicate = (value: string) => dayjs(value).isSame(date, 'day');
  const isComplete = completeDates.some(predicate);
  const isPlanned = plannedDates.some(predicate);

  return (
    <Day
      type={isComplete ? 'solid' : isPlanned ? 'outline' : 'clear'}
      onPress={_onPress}
      title={dayjs(date).date().toString()}
      disabled={isDisabled || isExtraDay}
      weight={dayjs(date).isSame(new Date(), 'day') ? 'bold' : 'normal'}
      color={isSelected || isComplete || isPlanned ? 'primary' : 'foreground'}
      titleColor={isComplete ? 'white' : isSelected ? 'primary' : 'foreground'}
    />
  );
};

export default React.memo<P>(PlanCalendarDay);
