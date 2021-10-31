import {
  LayoutChangeEvent,
  LayoutRectangle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { Dispatch, SetStateAction } from 'react';

const useListeners = (
  setLabelLayout: Dispatch<
    SetStateAction<Pick<LayoutRectangle, 'width' | 'height'>>
  >,
  setActive: Dispatch<SetStateAction<boolean>>,
  value?: string,
  onPropsFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void,
  onPropsBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void,
): {
  onLabelLayout: (event: LayoutChangeEvent) => void;
  onFocus: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
} => {
  const onLabelLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    setLabelLayout(nativeEvent.layout);
  };
  const onFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onPropsFocus) {
      onPropsFocus(event);
    }

    setActive(true);
  };
  const onBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onPropsBlur) {
      onPropsBlur(event);
    }

    if (!value) {
      setActive(false);
    }
  };

  return {
    onLabelLayout,
    onFocus,
    onBlur,
  };
};

export default useListeners;
