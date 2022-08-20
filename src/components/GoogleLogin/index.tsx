import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import React, { ReactElement, useMemo } from 'react';
import { getUniqueId } from 'react-native-device-info';

import SocialIcon from '@src/components/SocialIcon';
import { flash } from '@src/functions';
import { useSocialLoginMutation } from '@src/operations/mutations/socialLogin';
import { SocialProvider } from '@src/types/graphql';

import { SNSButton } from './styled';

type P = {};

GoogleSignin.configure({
  webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
  offlineAccess: false,
  forceCodeForRefreshToken: false,
  iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
});

const GoogleLogin: React.FC<P> = () => {
  const node = useMemo<ReactElement>(
    () => <SocialIcon provider={SocialProvider.Google} />,
    [],
  );

  const [socialLogin] = useSocialLoginMutation();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { user } = await GoogleSignin.signIn();

      await socialLogin({
        variables: {
          input: {
            deviceID: getUniqueId(),
            email: user.email,
            name: user.name || '',
            nickname: user.name,
            provider: SocialProvider.Google,
          },
        },
      });
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        flash({
          type: 'error',
          title: '소셜 로그인이 취소되었습니다.',
          contents: error.message,
        });
      } else if (error.code === statusCodes.IN_PROGRESS) {
        flash({
          type: 'error',
          title: '소셜 로그인을 진행 중입니다.',
          contents: error.message,
        });
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        flash({
          type: 'error',
          title: '구글 로그인을 사용할 수 없습니다.',
          contents: error.message,
        });
      } else {
        flash({
          type: 'error',
          title: '소셜 로그인에 실패했습니다.',
          contents: error.message,
        });
      }
    }
  };

  return <SNSButton node={node} onPress={signIn} color="grey5" />;
};

export default GoogleLogin;
