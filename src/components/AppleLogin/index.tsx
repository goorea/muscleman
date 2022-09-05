import {
  appleAuth,
  AppleRequestResponse,
} from '@invertase/react-native-apple-authentication';
import jwtDecode from 'jwt-decode';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { getUniqueId } from 'react-native-device-info';

import SocialIcon from '@src/components/SocialIcon';
import { useSocialLoginMutation } from '@src/operations/mutations/socialLogin';
import { SocialProvider } from '@src/types/graphql';

import { SNSButton } from './styled';

type P = {};

const AppleLogin: React.FC<P> = () => {
  const node = useMemo<ReactElement>(
    () => <SocialIcon provider={SocialProvider.Apple} />,
    [],
  );

  const [socialLogin] = useSocialLoginMutation();

  const getAppleAuthRequestResponse = (response: AppleRequestResponse) => {
    if (response.email) {
      return {
        email: response.email,
        fullName: response.fullName,
      };
    }

    const { email } = jwtDecode<AppleRequestResponse>(
      response.identityToken || '',
    );

    return {
      email,
      // 최초 애플로그인 이후 애플로그인 시도하면 fullName은 없다
      // 최초 애플로그인을 했을 때 이미 가입이 되어있는 상태이기 때문에 아래 정보는 mock 데이터
      fullName: {
        familyName: '애플',
        givenName: '사용자',
        nickname: '애플사용자',
      },
    };
  };

  const onAppleLogin = useCallback(async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    if (credentialState === appleAuth.State.AUTHORIZED) {
      const { email, fullName } = getAppleAuthRequestResponse(
        appleAuthRequestResponse,
      );

      if (email && fullName && fullName.familyName && fullName.givenName) {
        await socialLogin({
          variables: {
            input: {
              deviceID: getUniqueId(),
              email: email,
              name: fullName.familyName + fullName.givenName,
              nickname: fullName.nickname,
              provider: SocialProvider.Apple,
            },
          },
        });
      }
    }
  }, [socialLogin]);

  return <SNSButton node={node} onPress={onAppleLogin} color="foreground" />;
};

export default AppleLogin;
