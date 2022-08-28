import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { Props as MonthProps } from 'react-native-easy-calendar/src/Components/Month';

import { Month } from './styled';

const PlanCalendarMonth: React.FC<MonthProps> = ({
  date,
  onPress,
  isSelected,
  isDisabled,
}) => {
  const _onPress = useCallback(() => onPress(date), [date, onPress]);

  return (
    <Month
      type={isSelected ? 'solid' : 'clear'}
      disabled={isDisabled}
      onPress={_onPress}
      title={dayjs(date).format('MMM')}
      color={isSelected ? 'primary' : 'foreground'}
      weight="normal"
    />
  );
};

export default React.memo<MonthProps>(PlanCalendarMonth);
