import React from 'react';
import { Props as ArrowProps } from 'react-native-easy-calendar/src/Components/Arrow';

import Button from '@src/components/Button';

import useButtonProps from './hooks/useButtonProps';

const PlanCalendarArrow: React.FC<ArrowProps> = ({
  direction,
  isDisabled,
  onPress,
}) => {
  const { hitSlop, iconProps } = useButtonProps(direction);

  return (
    <Button
      type="clear"
      hitSlop={hitSlop}
      disabled={isDisabled}
      onPress={onPress}
      icon={iconProps}
    />
  );
};

export default React.memo<ArrowProps>(PlanCalendarArrow);
