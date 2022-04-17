import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { Props as DayProps } from 'react-native-easy-calendar/src/Components/Day';

import { Day } from './styled';

type P = DayProps & {
  completeDates: string[];
  plannedDates: string[];
  disabledDates?: string[];
};

const PlanCalendarDay: React.FC<P> = ({
  date,
  onPress,
  completeDates,
  plannedDates,
  disabledDates = [],
  isSelected = false,
  isExtraDay = false,
}) => {
  const handlePress = useCallback(() => onPress(date), [onPress, date]);
  const predicate = (value: string) => dayjs(value).isSame(date, 'day');
  const isComplete = completeDates.some(predicate);
  const isPlanned = plannedDates.some(predicate);
  const isDisable = disabledDates.some(predicate);

  return (
    <Day
      type={isComplete || isDisable ? 'solid' : isPlanned ? 'outline' : 'clear'}
      onPress={handlePress}
      title={dayjs(date).date().toString()}
      disabled={isDisable || isExtraDay}
      weight={dayjs(date).isSame(new Date(), 'day') ? 'bold' : 'normal'}
      color={
        isSelected || isComplete || (isPlanned && !isDisable)
          ? 'primary'
          : isDisable
          ? 'grey3'
          : 'foreground'
      }
      titleColor={isComplete ? 'white' : isSelected ? 'primary' : 'foreground'}
    />
  );
};

export default React.memo<P>(PlanCalendarDay);
