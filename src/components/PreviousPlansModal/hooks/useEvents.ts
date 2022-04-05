import React, { ForwardedRef, useCallback, useState } from 'react';

import { PreviousPlansModalElement } from '@src/components/PreviousPlansModal';

const useEvents = (
  ref: ForwardedRef<PreviousPlansModalElement>,
): {
  visible: boolean;
  hide: () => void;
} => {
  const [visible, setVisible] = useState<boolean>(false);

  const hide = useCallback(() => setVisible(false), [setVisible]);

  React.useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    hide,
  }));

  return {
    visible,
    hide,
  };
};

export default useEvents;
