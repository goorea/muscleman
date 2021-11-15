import { APP_NAME } from '@env';
import { HeaderHeightContext } from '@react-navigation/elements';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { getUniqueId } from 'react-native-device-info';
import { useRecoilValue } from 'recoil';

import AppleLogin from '@src/components/AppleLogin';
import Button from '@src/components/Button';
import GoogleLogin from '@src/components/GoogleLogin';
import KakaoLogin from '@src/components/KakaoLogin';
import KeyboardAvoidingScrollView from '@src/components/KeyboardAvoidingScrollView';
import NaverLogin from '@src/components/NaverLogin';
import Text from '@src/components/Text';
import { useLoginMutation } from '@src/operations/mutations/login';
import { userState } from '@src/recoils';
import { AuthStackParamList, RootStackParamList } from '@src/types/navigation';

import useRenders from './hooks/useRenders';
import useRules from './hooks/useRules';
import useSetUser from './hooks/useSetUser';
import useSuccess from './hooks/useSuccess';
import {
  Container,
  TitleContainer,
  Greeting,
  Submit,
  SNSTitleContainer,
  Line,
  SNSTitle,
  SNSButtonsContainer,
  LinksContainer,
  Divider,
  ErrorMessage,
} from './styled';

type P = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Login'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type LoginFormInput = {
  email: string;
  password: string;
};

const LoginScreen: React.FC<P> = ({ navigation }) => {
  const headerHeight = React.useContext(HeaderHeightContext) || 0;
  const user = useRecoilValue(userState);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormInput>();
  const [login, { data, loading, errorMessages }] = useLoginMutation();
  const { emailRules, passwordRules } = useRules();
  const onSubmit = async (input: LoginFormInput) => {
    await login({
      variables: {
        input: {
          ...input,
          deviceID: getUniqueId(),
        },
      },
    });
  };
  const { emailRender, passwordRender } = useRenders(handleSubmit(onSubmit));
  const onRegister = useCallback(
    () => navigation.navigate('Register'),
    [navigation],
  );
  const onFindPassword = useCallback(() => {}, []);

  useSetUser(data);
  useSuccess(navigation, user);

  return (
    <KeyboardAvoidingScrollView>
      <Container headerHeight={headerHeight}>
        <TitleContainer>
          <Text size={40} weight="bold">
            💪 {APP_NAME}
          </Text>
          <Greeting size={22}>반가워요!</Greeting>
          <Text size={22} weight="bold">
            근육맨으로 득근하세요
          </Text>
        </TitleContainer>

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
        {errorMessages.map(message => (
          <ErrorMessage key={message} size={12} color="error">
            {message}
          </ErrorMessage>
        ))}
        <Submit
          title="로그인"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting || loading}
        />

        <SNSTitleContainer>
          <Line />
          <SNSTitle size={13} color="grey3">
            SNS로 1초만에 로그인
          </SNSTitle>
          <Line />
        </SNSTitleContainer>
        <SNSButtonsContainer>
          <GoogleLogin />
          <AppleLogin />
          <NaverLogin />
          <KakaoLogin />
        </SNSButtonsContainer>

        <LinksContainer>
          <Button
            testID="registerButton"
            onPress={onRegister}
            type="clear"
            title="회원가입"
            color="grey3"
            weight="normal"
          />
          <Divider color="grey3">|</Divider>
          <Button
            onPress={onFindPassword}
            type="clear"
            title="비밀번호찾기"
            color="grey3"
            weight="normal"
          />
        </LinksContainer>
      </Container>
    </KeyboardAvoidingScrollView>
  );
};

export default LoginScreen;
