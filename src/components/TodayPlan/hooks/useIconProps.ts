import { useMemo } from 'react';

import { IconProps } from '@src/components/Icon';

const useIconProps = (
  complete?: boolean,
): {
  editIconProps: IconProps;
  completeIconProps: IconProps;
} => ({
  editIconProps: useMemo<IconProps>(
    () => ({ name: 'edit', size: 18, color: 'white' }),
    [],
  ),
  completeIconProps: useMemo<IconProps>(
    () => ({
      type: 'feather',
      size: 18,
      name: complete ? 'check-square' : 'square',
      color: 'white',
    }),
    [complete],
  ),
});

export default useIconProps;
