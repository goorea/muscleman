import {
  ForwardedRef,
  MutableRefObject,
  useImperativeHandle,
  useRef,
} from 'react';

import { DefaultModalElement } from '@src/components/modals/DefaultModal';

const useDefaultModal = <T extends DefaultModalElement | null>(
  ref: ForwardedRef<T>,
): {
  defaultModalRef: MutableRefObject<DefaultModalElement | null>;
  visible: boolean;
  show: () => void;
  hide: () => void;
} => {
  const defaultModalRef = useRef<DefaultModalElement | null>(null);
  const visible = defaultModalRef.current?.visible || false;
  const show = defaultModalRef.current?.show || (() => null);
  const hide = defaultModalRef.current?.hide || (() => null);
  const switches = defaultModalRef.current?.switches || (() => null);

  // @ts-ignore
  useImperativeHandle(ref, () => ({
    visible,
    show,
    hide,
    switches,
  }));

  return {
    defaultModalRef,
    visible,
    show,
    hide,
  };
};

export default useDefaultModal;
