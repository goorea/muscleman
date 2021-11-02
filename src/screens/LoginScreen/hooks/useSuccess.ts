import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';

import { User } from '@src/types/graphql';
import { AuthStackParamList, RootStackParamList } from '@src/types/navigation';

export function useSuccess(
  navigation: CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, 'Login'>,
    NativeStackScreenProps<RootStackParamList>
  >['navigation'],
  user?: User,
) {
  useEffect(() => {
    if (navigation && user) {
      navigation.navigate('SuccessModal', {
        type: '로그인',
        userName: user.name,
      });
    }
  }, [navigation, user]);
}
