import React from 'react';
import { Props as WeekdaysProps } from 'react-native-easy-calendar/src/Components/Weekdays';

import { Colors } from '@src/types/theme';

import { Container, WeekDay } from './styled';

const PlanCalendarWeekdays: React.FC<WeekdaysProps> = ({ days }) => {
  const getColor = (day: string): keyof Colors => {
    switch (day) {
      case '일':
        return 'error';
      case '토':
        return 'primary';
      default:
        return 'foreground';
    }
  };

  return (
    <Container>
      {days.map(day => (
        <WeekDay key={day} color={getColor(day)}>
          {day}
        </WeekDay>
      ))}
    </Container>
  );
};

export default React.memo<WeekdaysProps>(PlanCalendarWeekdays);
