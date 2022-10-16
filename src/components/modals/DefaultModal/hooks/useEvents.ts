import React, {
  ForwardedRef,
  MutableRefObject,
  useCallback,
  useState,
} from 'react';

import { ConfirmModalElement } from '@src/components/modals/ConfirmModal';
import { DefaultModalElement } from '@src/components/modals/DefaultModal';

const useEvents = (
  ref: ForwardedRef<ConfirmModalElement>,
): {
  visible: boolean;
  hide: () => void;
} => {
  const [visible, setVisible] = useState<boolean>(false);

  const hide = useCallback(() => setVisible(false), [setVisible]);
  const switches = (target: MutableRefObject<DefaultModalElement | null>) => {
    setVisible(false);
    target.current?.show();
  };

  React.useImperativeHandle(ref, () => ({
    visible,
    show: () => setVisible(true),
    hide,
    switches,
  }));

  return {
    visible,
    hide,
  };
};

export default useEvents;
