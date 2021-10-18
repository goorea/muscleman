import React from 'react';
import { TextField, TextFieldProps } from 'rn-material-ui-textfield';
import {
  Animated,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputFocusEventData,
} from 'react-native';
import { useTheme } from '@src/contexts/ThemeProvider';
import Icon from '@src/components/Icon';

type P = TextFieldProps & {
  onClear?: () => void;
};

const MaterialInput: React.ForwardRefRenderFunction<TextField, P> = (
  props,
  ref,
) => {
  const { colors } = useTheme();
  const fadeAnimation = new Animated.Value(0);
  const fade = (focus: boolean) =>
    Animated.timing(fadeAnimation, {
      toValue: focus ? 1 : 0,
      duration: 225,
      useNativeDriver: true,
    }).start();
  const onFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    fade(true);

    if (props.onFocus) {
      props.onFocus(event);
    }
  };
  const onBlur = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    fade(false);

    if (props.onBlur) {
      props.onBlur(event);
    }
  };
  const renderRightAccessory = () => (
    <Animated.View style={{ opacity: fadeAnimation }}>
      <Icon
        onPress={props.onClear}
        name="close-circle"
        type="ionicon"
        color="grey4"
      />
    </Animated.View>
  );

  return (
    <TextField
      ref={ref}
      textColor={colors.foreground}
      labelFontSize={14}
      lineWidth={1}
      activeLineWidth={1}
      disabledLineWidth={1}
      tintColor={colors.grey3}
      baseColor={colors.grey3}
      errorColor={colors.error}
      disabledLineType="solid"
      renderRightAccessory={renderRightAccessory}
      {...props}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default React.forwardRef(MaterialInput);
