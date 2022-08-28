import { appleAuth } from '@invertase/react-native-apple-authentication';
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

  const onAppleLogin = useCallback(async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    if (credentialState === appleAuth.State.AUTHORIZED) {
      const { email, fullName } = appleAuthRequestResponse;

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
