import React, { useRef } from 'react';
import { TextInput } from 'react-native';

import MaterialInput from '@src/components/MaterialInput';
import { RegisterAccountFormInput } from '@src/screens/RegisterAccountScreen';
import { RenderProps } from '@src/types/react-hook-form';

const useRenders = (
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>,
): {
  emailRender: RenderProps<RegisterAccountFormInput, 'email'>;
  passwordRender: RenderProps<RegisterAccountFormInput, 'password'>;
  passwordConfirmationRender: RenderProps<
    RegisterAccountFormInput,
    'passwordConfirmation'
  >;
} => {
  const passwordInputRef = useRef<TextInput | null>(null);
  const passwordConfirmationRef = useRef<TextInput | null>(null);
  const focusPasswordInput = () => passwordInputRef.current?.focus();
  const focusPasswordConfirmationInput = () =>
    passwordConfirmationRef.current?.focus();

  return {
    emailRender: ({ field, fieldState: { error } }) => (
      <MaterialInput
        testID="emailField"
        {...field}
        label="이메일"
        autoFocus={true}
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={focusPasswordInput}
        error={error?.message}
      />
    ),
    passwordRender: ({ field, fieldState: { error } }) => (
      <MaterialInput
        testID="passwordField"
        {...field}
        ref={ref => {
          field.ref(ref);
          passwordInputRef.current = ref;
        }}
        label="비밀번호"
        returnKeyType="next"
        secureTextEntry={true}
        onSubmitEditing={focusPasswordConfirmationInput}
        error={error?.message}
      />
    ),
    passwordConfirmationRender: ({ field, fieldState: { error } }) => (
      <MaterialInput
        testID="passwordConfirmationField"
        {...field}
        ref={ref => {
          field.ref(ref);
          passwordConfirmationRef.current = ref;
        }}
        label="비밀번호 확인"
        returnKeyType="next"
        secureTextEntry={true}
        onSubmitEditing={onSubmit}
        error={error?.message}
      />
    ),
  };
};

export default useRenders;
