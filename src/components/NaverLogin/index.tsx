import React, { ReactElement, useCallback, useMemo } from 'react';

import SocialIcon from '@src/components/SocialIcon';
import { SocialProvider } from '@src/types/graphql';

import { SNSButton } from './styled';

type P = {};

const NaverLogin: React.FC<P> = () => {
  const node = useMemo<ReactElement>(
    () => <SocialIcon provider={SocialProvider.Naver} />,
    [],
  );
  const onNaverLogin = useCallback(() => {}, []);

  return <SNSButton node={node} onPress={onNaverLogin} color="naver" />;
};

export default NaverLogin;
