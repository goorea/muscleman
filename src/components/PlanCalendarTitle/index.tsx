import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { Props as TitleProps } from 'react-native-easy-calendar/src/Components/Title';
import { VIEW } from 'react-native-easy-calendar/src/Constants';

import Button from '@src/components/Button';

const PlanCalendarTitle: React.FC<TitleProps> = ({
  activeView,
  date,
  onPress,
  isDisabled,
}) => {
  const title =
    activeView === VIEW.MONTH
      ? dayjs(date).format('YYYY년 MM월')
      : dayjs(date).format('YYYY');
  const _onPress = useCallback(() => onPress(date), [date, onPress]);

  return (
    <Button
      onPress={_onPress}
      type="clear"
      title={title}
      color="foreground"
      disabled={isDisabled}
      weight="normal"
    />
  );
};

export default React.memo<TitleProps>(PlanCalendarTitle);
