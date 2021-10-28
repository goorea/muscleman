import React from 'react';
import { TextField, TextFieldProps } from 'rn-material-ui-textfield';
import { useTheme } from '@src/contexts/ThemeProvider';

type P = Omit<TextFieldProps, 'error'> & {
  onChange: (text: string) => void;
};

const MaterialInput: React.ForwardRefRenderFunction<TextField, P> = (
  props,
  ref,
) => {
  const { colors } = useTheme();

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
      {...props}
      onChangeText={props.onChange}
    />
  );
};

export default React.forwardRef(MaterialInput);
