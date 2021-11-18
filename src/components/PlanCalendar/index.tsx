import Korean from 'dayjs/locale/ko';
import React from 'react';
import { DateSelectionCalendar } from 'react-native-easy-calendar';

import PlanCalendarArrow from '@src/components/PlanCalendarArrow';
import PlanCalendarDay from '@src/components/PlanCalendarDay';
import PlanCalendarMonth from '@src/components/PlanCalendarMonth';
import PlanCalendarTitle from '@src/components/PlanCalendarTitle';
import PlanCalendarWeekdays from '@src/components/PlanCalendarWeekdays';

import useTheme from './hooks/useTheme';

type P = {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  completeDates: string[];
  plannedDates: string[];
};

const PlanCalendar: React.FC<P> = ({
  selectedDate,
  onSelectDate,
  completeDates,
  plannedDates,
}) => {
  const { theme } = useTheme();

  return (
    <DateSelectionCalendar
      onSelectDate={onSelectDate}
      selectedDate={selectedDate}
      allowYearView={true}
      locale={Korean}
      theme={theme}
      ArrowComponent={PlanCalendarArrow}
      MonthComponent={PlanCalendarMonth}
      TitleComponent={PlanCalendarTitle}
      DayComponent={props => (
        <PlanCalendarDay
          {...props}
          completeDates={completeDates}
          plannedDates={plannedDates}
        />
      )}
      WeekdaysComponent={PlanCalendarWeekdays}
    />
  );
};

export default React.memo<P>(PlanCalendar);
