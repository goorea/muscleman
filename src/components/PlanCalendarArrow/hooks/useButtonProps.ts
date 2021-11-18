import { useMemo } from 'react';
import { Insets } from 'react-native';

import { IconProps } from '@src/components/Icon';

const useButtonProps = (
  direction: 'left' | 'right',
): { hitSlop: Insets; iconProps: IconProps } => ({
  hitSlop: useMemo<Insets>(
    () => ({ top: 10, bottom: 10, left: 10, right: 10 }),
    [],
  ),
  iconProps: useMemo<IconProps>(
    () => ({
      name:
        direction === 'left' ? 'keyboard-arrow-left' : 'keyboard-arrow-right',
      size: 30,
      color: 'primary',
    }),
    [direction],
  ),
});

export default useButtonProps;
