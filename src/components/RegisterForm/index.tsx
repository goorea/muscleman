import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UseFormGetValues } from 'react-hook-form';
import DatePicker from 'react-native-date-picker';

import KeyboardAvoidingScrollView from '@src/components/KeyboardAvoidingScrollView';
import Text from '@src/components/Text';
import { useTheme } from '@src/contexts/ThemeProvider';
import { Gender } from '@src/types/graphql';

import useRenders from './hooks/useRenders';
import useRules from './hooks/useRules';
import {
  Container,
  Submit,
  Title,
  GenderContainer,
  GenderSelector,
  GenderSelectors,
} from './styled';

export type RegisterFormElement = {
  getValues: UseFormGetValues<RegisterUserFormInput>;
};

type P = {
  onSubmit: (input: RegisterUserFormInput) => void;
  errorMessages: string[];
};

export type RegisterUserFormInput = {
  name: string;
  nickname: string;
  tel: string;
  birth: string;
  gender: Gender;
};

const RegisterForm: React.ForwardRefRenderFunction<RegisterFormElement, P> = (
  { onSubmit, errorMessages },
  ref,
) => {
  const { colors } = useTheme();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { isSubmitting },
  } = useForm<RegisterUserFormInput>({
    defaultValues: { gender: Gender.Male },
  });
  const [visibleBirthPicker, setVisibleBirthPicker] = useState<boolean>(false);
  const { nameRules, nicknameRules, telRules, birthRules } = useRules();
  const { nameRender, nicknameRender, telRender, birthRender } = useRenders(
    setVisibleBirthPicker,
  );
  const onBirthPick = (date: Date) => {
    setVisibleBirthPicker(false);
    setValue('birth', dayjs(date).format('YYYY-MM-DD'));
  };
  const onBirthCancel = () => setVisibleBirthPicker(false);
  const setMale = () => setValue('gender', Gender.Male);
  const setFemale = () => setValue('gender', Gender.Female);

  React.useImperativeHandle(ref, () => ({
    getValues,
  }));

  return (
    <>
      <KeyboardAvoidingScrollView
        floatChildren={
          <Submit
            onPress={handleSubmit(onSubmit)}
            title="확인"
            disabled={isSubmitting}
          />
        }>
        <Container>
          <Title size={20} weight="bold">
            정보를 입력해주세요
          </Title>

          <Controller
            render={nameRender}
            name="name"
            control={control}
            rules={nameRules}
          />
          <Controller
            render={nicknameRender}
            name="nickname"
            control={control}
            rules={nicknameRules}
          />
          <Controller
            render={telRender}
            name="tel"
            control={control}
            rules={telRules}
          />
          <Controller
            render={birthRender}
            name="birth"
            control={control}
            rules={birthRules}
          />
          <GenderContainer>
            <Text color="grey3">성별</Text>

            <GenderSelectors>
              <GenderSelector
                title="남자"
                color={watch('gender') === Gender.Male ? 'primary' : 'disabled'}
                titleColor={watch('gender') === Gender.Male ? 'white' : 'black'}
                weight="normal"
                onPress={setMale}
              />
              <GenderSelector
                title="여자"
                color={
                  watch('gender') === Gender.Female ? 'primary' : 'disabled'
                }
                titleColor={
                  watch('gender') === Gender.Female ? 'white' : 'black'
                }
                weight="normal"
                onPress={setFemale}
              />
            </GenderSelectors>
          </GenderContainer>

          {errorMessages.map(error => (
            <Text size={12} color="error">
              {error}
            </Text>
          ))}
        </Container>
      </KeyboardAvoidingScrollView>

      <DatePicker
        modal
        mode="date"
        locale="ko"
        textColor={colors.foreground}
        open={visibleBirthPicker}
        date={dayjs(watch('birth')).toDate()}
        title="생년월일"
        confirmText="확인"
        cancelText="취소"
        onConfirm={onBirthPick}
        onCancel={onBirthCancel}
      />
    </>
  );
};

export default React.forwardRef(RegisterForm);
