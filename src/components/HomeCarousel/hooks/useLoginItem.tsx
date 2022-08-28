import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { ViewProps } from 'react-native';

import Text from '@src/components/Text';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';

import { LoginButton, LoginContainer } from '../styled';

const useLoginItem = (
  navigation: CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, 'Home'>,
    NativeStackScreenProps<RootStackParamList>
  >['navigation'],
): React.ReactElement<ViewProps, 'View'> => {
  const onLogin = useCallback(
    () =>
      navigation.navigate('Auth', {
        screen: 'Login',
      }),
    [navigation],
  );

  return (
    <LoginContainer>
      <Text weight="bold" color="white">
        로그인 한 후에 확인할 수 있어요!
      </Text>
      <LoginButton
        onPress={onLogin}
        type="outline"
        color="white"
        title="로그인 하러가기"
        size={12}
      />
    </LoginContainer>
  );
};

export default useLoginItem;
