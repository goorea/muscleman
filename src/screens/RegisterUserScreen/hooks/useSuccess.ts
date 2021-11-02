import AsyncStorage from '@react-native-async-storage/async-storage';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { userState } from '@src/recoils';
import { Mutation } from '@src/types/graphql';
import {
  AuthStackParamList,
  RegisterStackParamList,
} from '@src/types/navigation';

const useSuccess = (
  navigation: CompositeScreenProps<
    NativeStackScreenProps<RegisterStackParamList, 'RegisterUser'>,
    NativeStackScreenProps<AuthStackParamList>
  >['navigation'],
  data?: Pick<Mutation, 'register'> | null,
) => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (navigation && data) {
      setUser(data.register.user);
      AsyncStorage.multiSet([
        ['@token', data.register.token],
        ['@refresh_token', data.register.refresh_token],
      ]).then(() => {
        navigation.navigate('SuccessModal', {
          type: '회원가입',
          userName: data.register.user.name,
        });
      });
    }
  }, [navigation, data, setUser]);
};

export default useSuccess;
