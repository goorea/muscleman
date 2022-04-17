import React, {
  ForwardedRef,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import * as ReactNative from 'react-native';
import { ReactNativeThemedStyledFunction } from 'styled-components/native';

import {
  CopyButtonBody,
  CopyButtonTitle,
} from '@src/components/CopyModal/styled';
import Icon from '@src/components/Icon';

import { CopyModalElement } from '../index';

const useEvents = (
  ref: ForwardedRef<CopyModalElement>,
): {
  visible: boolean;
  node: ReactElement<
    ReactNativeThemedStyledFunction<typeof ReactNative.View, {}>
  >;
  hide: () => void;
} => {
  const [visible, setVisible] = useState<boolean>(false);

  const node = useMemo(
    () => (
      <CopyButtonBody>
        <Icon type="ionicon" name="copy" color="white" size={16} />
        <CopyButtonTitle color="white" weight="bold">
          복사하기
        </CopyButtonTitle>
      </CopyButtonBody>
    ),
    [],
  );

  const hide = useCallback(() => setVisible(false), []);

  React.useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
  }));

  return {
    visible,
    node,
    hide,
  };
};

export default useEvents;
