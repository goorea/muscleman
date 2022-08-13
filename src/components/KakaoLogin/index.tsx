import {
  getProfile,
  KakaoProfile,
  KakaoProfileNoneAgreement,
  login,
} from '@react-native-seoul/kakao-login';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { getUniqueId } from 'react-native-device-info';

import SocialIcon from '@src/components/SocialIcon';
import { flash } from '@src/functions';
import { useSocialLoginMutation } from '@src/operations/mutations/socialLogin';
import { SocialProvider } from '@src/types/graphql';

import { SNSButton } from './styled';

type P = {};

const KakaoLogin: React.FC<P> = () => {
  const [socialLogin] = useSocialLoginMutation();
  const isKakaoProfile = (
    kakaoProfile: KakaoProfile | KakaoProfileNoneAgreement,
  ): kakaoProfile is KakaoProfile =>
    (kakaoProfile as KakaoProfile).email !== undefined;

  const node = useMemo<ReactElement>(
    () => <SocialIcon provider={SocialProvider.Kakao} />,
    [],
  );
  const onKakaoLogin = useCallback(async () => {
    try {
      await login();
      const profile: KakaoProfile | KakaoProfileNoneAgreement =
        await getProfile();

      if (isKakaoProfile(profile)) {
        await socialLogin({
          variables: {
            input: {
              deviceID: getUniqueId(),
              email: profile.email,
              name: profile.nickname,
              nickname: profile.nickname,
              provider: SocialProvider.Kakao,
            },
          },
        });
      }
    } catch (error: any) {
      flash({
        type: 'error',
        title: '소셜 로그인에 실패했습니다.',
        contents: error.message,
      });
    }
  }, [socialLogin]);

  return <SNSButton node={node} onPress={onKakaoLogin} color="kakao" />;
};

export default KakaoLogin;
