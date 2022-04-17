import { useMemo } from 'react';

import { IconProps } from '@src/components/Icon';

const useIconProps = (
  complete?: boolean,
): {
  editIconProps: IconProps;
  dragIconProps: IconProps;
  completeIconProps: IconProps;
  copyIconProps: IconProps;
  deleteIconProps: IconProps;
} => ({
  editIconProps: useMemo<IconProps>(
    () => ({ name: 'edit', size: 18, color: 'white' }),
    [],
  ),
  dragIconProps: useMemo<IconProps>(
    () => ({ type: 'ionicon', name: 'menu-outline', color: 'primary' }),
    [],
  ),
  completeIconProps: useMemo<IconProps>(
    () => ({
      type: 'feather',
      size: 18,
      name: complete ? 'check-square' : 'square',
      color: complete ? 'success' : 'warning',
    }),
    [complete],
  ),
  copyIconProps: useMemo<IconProps>(
    () => ({
      type: 'ionicon',
      name: 'copy',
      color: 'success',
      size: 16,
    }),
    [],
  ),
  deleteIconProps: useMemo<IconProps>(
    () => ({
      type: 'ionicon',
      name: 'remove-circle-outline',
      color: 'error',
      size: 20,
    }),
    [],
  ),
});

export default useIconProps;
