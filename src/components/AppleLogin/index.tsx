import React, { ReactElement, useCallback, useMemo } from 'react';

import SocialIcon from '@src/components/SocialIcon';
import { SocialProvider } from '@src/types/graphql';

import { SNSButton } from './styled';

type P = {};

const AppleLogin: React.FC<P> = () => {
  const node = useMemo<ReactElement>(
    () => <SocialIcon provider={SocialProvider.Apple} />,
    [],
  );
  const onAppleLogin = useCallback(() => {}, []);

  return <SNSButton node={node} onPress={onAppleLogin} color="foreground" />;
};

export default AppleLogin;
