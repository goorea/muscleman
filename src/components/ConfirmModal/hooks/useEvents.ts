import React, { ForwardedRef, useCallback, useEffect, useState } from 'react';

import { ConfirmModalElement } from '@src/components/ConfirmModal';

const useEvents = (
  ref: ForwardedRef<ConfirmModalElement>,
  onCancel: () => void,
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

  useEffect(() => {
    if (!visible) {
      onCancel();
    }
  }, [onCancel, visible]);

  return {
    visible,
    hide,
  };
};

export default useEvents;
