import React, { useCallback } from 'react';

import { SNSButton } from './styled';

type P = {};

const AppleLogin: React.FC<P> = () => {
  const onAppleLogin = useCallback<() => void>(() => {}, []);

  return (
    <SNSButton
      icon={{
        name: 'apple',
        type: 'font-awesome-5',
        color: 'background',
      }}
      onPress={onAppleLogin}
      color="foreground"
    />
  );
};

export default AppleLogin;
