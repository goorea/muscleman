import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { AuthStackParamList, RootStackParamList } from '@src/types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLoginMutation } from '@src/hooks/mutations/useLoginMutation';
import { useForm, Controller } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { userState } from '@src/recoils';
import { getUniqueId } from 'react-native-device-info';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import MaterialInput from '@src/components/MaterialInput';
import { APP_NAME } from '@env';
import GoogleIcon from '@src/components/GoogleIcon';
import NaverIcon from '@src/components/NaverIcon';
import KakaoIcon from '@src/components/KakaoIcon';
import KeyboardAvoidingScrollView from '@src/components/KeyboardAvoidingScrollView';
import { HeaderHeightContext } from '@react-navigation/elements';
import { useSetUser } from './hooks/useSetUser';
import { useSetErrorMessages } from './hooks/useSetErrorMessages';
import { useSuccess } from './hooks/useSuccess';
import {
  Container,
  TitleContainer,
  Greeting,
  Submit,
  SNSTitleContainer,
  Line,
  SNSTitle,
  SNSButtonsContainer,
  SNSButton,
  LinksContainer,
  Divider,
  ErrorMessage,
} from 'src/screens/LoginScreen/styled';
import { TextInput } from 'react-native';

type P = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Login'>,
  NativeStackScreenProps<RootStackParamList>
>;

type FormInput = {
  email: string;
  password: string;
};

const LoginScreen: React.FC<P> = ({ navigation }) => {
  const headerHeight = React.useContext(HeaderHeightContext) || 0;
  const [user, setUser] = useRecoilState(userState);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>();
  const passwordInputRef = React.useRef<TextInput>(null);
  const focusPasswordInput = () => passwordInputRef.current?.focus();
  const [login, { data, error, loading }] = useLoginMutation();
  const [errorMessages, setErrorMessages] = React.useState<string[]>([]);
  const onSubmit = async (input: FormInput) => {
    await login({
      variables: {
        input: {
          ...input,
          device_id: getUniqueId(),
        },
      },
    });
  };
  const onGoogleLogin = () => {};
  const onAppleLogin = () => {};
  const onNaverLogin = () => {};
  const onKakaoLogin = () => {};
  const onRegister = () => navigation.navigate('Register');
  const onFindPassword = () => {};

  useSetUser(setUser, data);
  useSetErrorMessages(setErrorMessages, error);
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
          render={({ field }) => (
            <MaterialInput
              {...field}
              testID="emailField"
              onChangeText={field.onChange}
              label="이메일"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={focusPasswordInput}
              error={errors.email?.message}
            />
          )}
          name="email"
          control={control}
          rules={{
            required: '이메일을 입력해주세요',
            pattern: {
              value:
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
              message: '이메일 형식이 아닙니다',
            },
          }}
        />
        <Controller
          render={({ field }) => (
            <MaterialInput
              {...field}
              testID="passwordField"
              ref={passwordInputRef}
              label="비밀번호"
              returnKeyType="done"
              secureTextEntry={true}
              onSubmitEditing={handleSubmit(onSubmit)}
              error={errors.password?.message}
            />
          )}
          name="password"
          control={control}
          rules={{
            required: '비밀번호를 입력해주세요',
            minLength: {
              value: 8,
              message: '8글자보다 적습니다',
            },
          }}
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
          <SNSButton
            title={<GoogleIcon />}
            onPress={onGoogleLogin}
            color="grey5"
          />
          <SNSButton
            icon={{
              name: 'apple',
              type: 'font-awesome-5',
              color: 'background',
            }}
            onPress={onAppleLogin}
            color="foreground"
          />
          <SNSButton
            title={<NaverIcon />}
            onPress={onNaverLogin}
            color="naver"
          />
          <SNSButton
            title={<KakaoIcon />}
            onPress={onKakaoLogin}
            color="kakao"
          />
        </SNSButtonsContainer>

        <LinksContainer>
          <Button
            testID="register-button"
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
