import React, {
  MutableRefObject,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import * as ReactNative from 'react-native';
import { ReactNativeThemedStyledFunction } from 'styled-components/native';

import Icon from '@src/components/Icon';
import { CopyModalElement } from '@src/components/modals/CopyModal';
import useIconProps from '@src/hooks/useIconProps';

import { ButtonBody, ButtonTitle } from '../styled';

const useCopy = (): {
  copyModalRef: MutableRefObject<CopyModalElement | null>;
  copyButtonNode: ReactElement<
    ReactNativeThemedStyledFunction<typeof ReactNative.View, {}>
  >;
  showCopyPlanModal: () => void;
} => {
  const { copyIconProps } = useIconProps(false);
  const copyModalRef = useRef<CopyModalElement | null>(null);
  const copyButtonNode = useMemo(
    () => (
      <ButtonBody>
        <Icon {...copyIconProps} />
        <ButtonTitle weight="bold" color="success">
          복사
        </ButtonTitle>
      </ButtonBody>
    ),
    [copyIconProps],
  );

  const showCopyPlanModal = useCallback(() => copyModalRef.current?.show(), []);

  return {
    copyModalRef,
    copyButtonNode,
    showCopyPlanModal,
  };
};

export default useCopy;
