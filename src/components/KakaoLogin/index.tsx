import React, { ReactElement, useCallback, useMemo } from 'react';

import SocialIcon from '@src/components/SocialIcon';
import { SocialProvider } from '@src/types/graphql';

import { SNSButton } from './styled';

type P = {};

const KakaoLogin: React.FC<P> = () => {
  const node = useMemo<ReactElement>(
    () => <SocialIcon provider={SocialProvider.Kakao} />,
    [],
  );
  const onKakaoLogin = useCallback(() => {}, []);

  return <SNSButton node={node} onPress={onKakaoLogin} color="kakao" />;
};

export default KakaoLogin;
