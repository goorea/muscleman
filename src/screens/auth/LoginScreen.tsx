import React, { useEffect } from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { AuthStackParamList, RootStackParamList } from '@src/types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input } from 'react-native-elements';
import Loader from '@src/components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { flash } from '@src/functions';
import { useLoginMutation } from '@src/hooks/mutations/useLoginMutation';
import { useForm, Controller } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tokenState, userQuery } from '@src/recoils';
import styled from 'styled-components/native';
import { flexFillCenter } from '@src/styles/flex';
import { getUniqueId } from 'react-native-device-info';
import Text from '@src/components/Text';

const Container = styled.View`
  ${flexFillCenter}
`;

type P = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Login'>,
  NativeStackScreenProps<RootStackParamList>
> & {};

type FormData = {
  email: string;
  password: string;
};

const LoginScreen: React.FC<P> = ({ navigation }) => {
  const user = useRecoilValue(userQuery);
  const setToken = useSetRecoilState(tokenState);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: 'jhs851@naver.com',
      password: '123123123',
    },
  });
  const [login, { data, loading }] = useLoginMutation();
  const onSubmit = async (input: FormData) => {
    await login({
      variables: { input: { ...input, device_id: getUniqueId() } },
    });
  };

  useEffect(() => {
    if (data) {
      const { token, refresh_token } = data.login;

      AsyncStorage.multiSet([
        ['@token', token],
        ['@refresh_token', refresh_token],
      ]).then(() => setToken(token));
    }
  }, [data, setToken]);

  useEffect(() => {
    if (navigation && user) {
      flash({
        title: `${user.name}님 환영합니다!`,
        contents: '오늘도 득근하세요 !!!',
        type: 'success',
      });
      navigation.goBack();
    }
  }, [navigation, user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Text>Login Screen</Text>
      <Controller
        render={({ field }) => (
          <Input
            leftIcon={{ name: 'email' }}
            label="이메일"
            errorMessage={errors.email?.message}
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={field.onChange}
            {...field}
          />
        )}
        name="email"
        control={control}
        rules={{
          required: '이메일을 입력 해주세요',
        }}
      />
      <Controller
        render={({ field }) => (
          <Input
            leftIcon={{ name: 'lock' }}
            label="비밀번호"
            errorMessage={errors.password?.message}
            returnKeyType="done"
            secureTextEntry={true}
            onChangeText={field.onChange}
            {...field}
          />
        )}
        name="password"
        control={control}
        rules={{
          required: '비밀번호를 입력 해주세요',
        }}
      />
      <Button title="Login" onPress={handleSubmit(onSubmit)} />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
    </Container>
  );
};

export default LoginScreen;
