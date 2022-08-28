import { useCallback, useMemo } from 'react';

import { IconProps } from '@src/components/Icon';

const useEdit = (): {
  edit: () => null;
  editIconProps: IconProps;
} => ({
  // TODO: Edit ProfileScreen
  edit: useCallback(() => null, []),
  editIconProps: useMemo<IconProps>(
    () => ({
      name: 'edit',
      color: 'primary',
      size: 18,
    }),
    [],
  ),
});

export default useEdit;
