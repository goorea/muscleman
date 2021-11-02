import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import KeyboardAvoidingScrollView from '@src/components/KeyboardAvoidingScrollView';
import {
  AuthStackParamList,
  RegisterStackParamList,
} from '@src/types/navigation';

import useRenders from './hooks/useRenders';
import useRules from './hooks/useRules';
import { Container, Title, Submit } from './styled';

type P = CompositeScreenProps<
  NativeStackScreenProps<RegisterStackParamList, 'RegisterAccount'>,
  NativeStackScreenProps<AuthStackParamList>
>;

export type RegisterAccountFormInput = {
  email: string;
  password: string;
  password_confirmation: string;
};

const RegisterAccountScreen: React.FC<P> = ({ navigation }) => {
  const { control, handleSubmit, getValues } =
    useForm<RegisterAccountFormInput>();
  const { emailRules, passwordRules, passwordConfirmationRules } =
    useRules(getValues);
  const onSubmit = (input: RegisterAccountFormInput) =>
    navigation.navigate('RegisterUser', input);
  const { emailRender, passwordRender, passwordConfirmationRender } =
    useRenders(handleSubmit(onSubmit));

  return (
    <KeyboardAvoidingScrollView
      floatChildren={<Submit onPress={handleSubmit(onSubmit)} title="다음" />}>
      <Container>
        <Title size={20} weight="bold">
          이메일과 비밀번호를 입력해주세요
        </Title>

        <Controller
          render={emailRender}
          name="email"
          control={control}
          rules={emailRules}
        />
        <Controller
          render={passwordRender}
          name="password"
          control={control}
          rules={passwordRules}
        />
        <Controller
          render={passwordConfirmationRender}
          name="password_confirmation"
          control={control}
          rules={passwordConfirmationRules}
        />
      </Container>
    </KeyboardAvoidingScrollView>
  );
};

export default RegisterAccountScreen;
