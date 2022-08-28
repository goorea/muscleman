import React from 'react';
import { TextInput } from 'react-native';

import MaterialInput from '@src/components/MaterialInput';
import { LoginFormInput } from '@src/screens/LoginScreen';
import { RenderProps } from '@src/types/react-hook-form';

const useRenders = (
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>,
): {
  emailRender: RenderProps<LoginFormInput, 'email'>;
  passwordRender: RenderProps<LoginFormInput, 'password'>;
} => {
  const passwordInputRef = React.useRef<TextInput | null>(null);
  const focusPasswordInput = () => passwordInputRef.current?.focus();

  return {
    emailRender: ({ field, fieldState: { error } }) => (
      <MaterialInput
        {...field}
        testID="emailField"
        label="이메일"
        keyboardType="email-address"
        autoCompleteType="email"
        returnKeyType="next"
        onSubmitEditing={focusPasswordInput}
        error={error?.message}
      />
    ),
    passwordRender: ({ field, fieldState: { error } }) => (
      <MaterialInput
        {...field}
        testID="passwordField"
        ref={ref => {
          field.ref(ref);
          passwordInputRef.current = ref;
        }}
        label="비밀번호"
        returnKeyType="done"
        secureTextEntry={true}
        onSubmitEditing={onSubmit}
        error={error?.message}
      />
    ),
  };
};

export default useRenders;
