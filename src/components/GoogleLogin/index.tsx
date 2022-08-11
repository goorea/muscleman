import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import React, { ReactElement, useMemo } from 'react';
import { getUniqueId } from 'react-native-device-info';

import SocialIcon from '@src/components/SocialIcon';
import useSetRecoilStates from '@src/hooks/useSetRecoilStates';
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

  const [socialLogin, { data }] = useSocialLoginMutation();

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
            provider: SocialProvider.Kakao,
          },
        },
      });
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated');
      } else {
        console.log(error.message);
      }
    }
  };

  useSetRecoilStates(data?.socialLogin);

  return <SNSButton node={node} onPress={signIn} color="grey5" />;
};

export default GoogleLogin;
