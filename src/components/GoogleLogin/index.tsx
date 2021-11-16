import React, { ReactElement, useCallback, useMemo } from 'react';

import SocialIcon from '@src/components/SocialIcon';
import { SocialProvider } from '@src/types/graphql';

import { SNSButton } from './styled';

type P = {};

const GoogleLogin: React.FC<P> = () => {
  const node = useMemo<ReactElement>(
    () => <SocialIcon provider={SocialProvider.Google} />,
    [],
  );
  const onGoogleLogin = useCallback(() => {}, []);

  return <SNSButton node={node} onPress={onGoogleLogin} color="grey5" />;
};

export default GoogleLogin;
