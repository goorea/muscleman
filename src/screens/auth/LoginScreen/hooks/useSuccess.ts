import { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from '@src/types/navigation';
import { CompositeScreenProps } from '@react-navigation/native';
import { User } from '@src/types/graphql';

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
