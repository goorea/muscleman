import { useMemo } from 'react';

import { IconProps } from '@src/components/Icon';
import { Plan } from '@src/types/graphql';

const useIconProps = (
  plan: Plan,
): { editIconProps: IconProps; completeIconProps: IconProps } => ({
  editIconProps: useMemo<IconProps>(
    () => ({ name: 'edit', size: 18, color: 'white' }),
    [],
  ),
  completeIconProps: useMemo<IconProps>(
    () => ({
      name: plan.complete ? 'checkmark' : 'close',
      type: 'ionicon',
      color: 'white',
      size: 18,
    }),
    [plan.complete],
  ),
});

export default useIconProps;
