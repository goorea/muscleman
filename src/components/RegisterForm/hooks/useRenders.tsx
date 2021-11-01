import { RenderProps } from '@src/types/react-hook-form';
import { RegisterUserFormInput } from '@src/components/RegisterForm';
import MaterialInput from '@src/components/MaterialInput';
import React, { Dispatch, SetStateAction, useRef } from 'react';
import { TextInput } from 'react-native';

const useRenders = (
  setVisibleBirthPicker: Dispatch<SetStateAction<boolean>>,
): {
  nameRender: RenderProps<RegisterUserFormInput, 'name'>;
  nicknameRender: RenderProps<RegisterUserFormInput, 'nickname'>;
  telRender: RenderProps<RegisterUserFormInput, 'tel'>;
  birthRender: RenderProps<RegisterUserFormInput, 'birth'>;
} => {
  const nicknameInputRef = useRef<TextInput | null>(null);
  const telInputRef = useRef<TextInput | null>(null);
  const birthInputRef = useRef<TextInput | null>(null);
  const focusNicknameInput = () => nicknameInputRef.current?.focus();
  const focusTelInput = () => telInputRef.current?.focus();
  const openBirthPicker = () => {
    setVisibleBirthPicker(true);
    birthInputRef.current?.blur();
  };

  return {
    nameRender: ({ field, fieldState: { error } }) => (
      <MaterialInput
        {...field}
        label="이름"
        autoFocus={true}
        autoCompleteType="name"
        returnKeyType="next"
        onSubmitEditing={focusNicknameInput}
        error={error?.message}
      />
    ),
    nicknameRender: ({ field, fieldState: { error } }) => (
      <MaterialInput
        {...field}
        ref={ref => {
          field.ref(ref);
          nicknameInputRef.current = ref;
        }}
        label="닉네임"
        autoCompleteType="username"
        returnKeyType="next"
        onSubmitEditing={focusTelInput}
        error={error?.message}
      />
    ),
    telRender: ({ field, fieldState: { error } }) => (
      <MaterialInput
        {...field}
        ref={ref => {
          field.ref(ref);
          telInputRef.current = ref;
        }}
        label="휴대폰 번호"
        autoCompleteType="tel"
        keyboardType="phone-pad"
        returnKeyType="next"
        onSubmitEditing={openBirthPicker}
        error={error?.message}
      />
    ),
    birthRender: ({ field, fieldState: { error } }) => (
      <MaterialInput
        {...field}
        ref={ref => {
          field.ref(ref);
          birthInputRef.current = ref;
        }}
        onFocus={openBirthPicker}
        onChange={() => null}
        label="생년월일"
        error={error?.message}
      />
    ),
  };
};

export default useRenders;
