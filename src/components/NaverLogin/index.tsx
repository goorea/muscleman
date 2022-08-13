import { NAVER_CLIENT_ID, NAVER_SECRET_KEY, APP_NAME } from '@env';
import {
  NaverLogin as Naver,
  getProfile,
  ConfigParam,
} from '@react-native-seoul/naver-login';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import { getUniqueId } from 'react-native-device-info';

import SocialIcon from '@src/components/SocialIcon';
import { flash } from '@src/functions';
import { useSocialLoginMutation } from '@src/operations/mutations/socialLogin';
import { SocialProvider } from '@src/types/graphql';

import { SNSButton } from './styled';

type P = {};

const NaverLogin: React.FC<P> = () => {
  const [socialLogin] = useSocialLoginMutation();
  const node = useMemo<ReactElement>(
    () => <SocialIcon provider={SocialProvider.Naver} />,
    [],
  );
  const configParam: ConfigParam = useMemo(
    () =>
      Platform.OS === 'ios'
        ? {
            kConsumerKey: NAVER_CLIENT_ID,
            kConsumerSecret: NAVER_SECRET_KEY,
            kServiceAppName: APP_NAME,
            kServiceAppUrlScheme: 'kr.muscleman',
          }
        : {
            kConsumerKey: NAVER_CLIENT_ID,
            kConsumerSecret: NAVER_SECRET_KEY,
            kServiceAppName: APP_NAME,
          },
    [],
  );

  const onNaverLogin = useCallback(async () => {
    Naver.login(configParam, async (error, result) => {
      if (error) {
        flash({
          type: 'error',
          title: '소셜 로그인에 실패했습니다.',
          contents: error.message,
        });
      } else {
        const profileResult = await getProfile(result?.accessToken || '');

        if (profileResult) {
          await socialLogin({
            variables: {
              input: {
                deviceID: getUniqueId(),
                email: profileResult.response.email,
                name: profileResult.response.name,
                nickname: profileResult.response.nickname,
                provider: SocialProvider.Naver,
              },
            },
          });
        }
      }
    });
  }, [configParam, socialLogin]);

  return <SNSButton node={node} onPress={onNaverLogin} color="naver" />;
};

export default NaverLogin;
