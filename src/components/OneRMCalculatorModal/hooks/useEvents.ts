import React, { Ref, useCallback, useState } from 'react';

import { OneRMCalculatorModalElement } from '@src/components/OneRMCalculatorModal';

const useEvents = (
  ref: Ref<OneRMCalculatorModalElement>,
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
