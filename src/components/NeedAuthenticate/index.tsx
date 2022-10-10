import { NavigationProp } from '@react-navigation/core/src/types';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import Text from '@src/components/Text';
import { RootStackParamList } from '@src/types/navigation';

import { Circle, LoginButton, NotLoginContainer } from './styled';

const NeedAuthenticate: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const onLogin = useCallback(
    () =>
      navigation.navigate('Auth', {
        screen: 'Login',
      }),
    [navigation],
  );

  return (
    <NotLoginContainer>
      <Text weight="bold">로그인 후 이용 가능합니다!</Text>
      <Circle>
        <Text size={40}>💪</Text>
      </Circle>
      <LoginButton
        onPress={onLogin}
        type="outline"
        color="primary"
        title="로그인 하러가기"
        size={12}
      />
    </NotLoginContainer>
  );
};

export default NeedAuthenticate;
