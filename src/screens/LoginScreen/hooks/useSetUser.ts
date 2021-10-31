import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Mutation } from '@src/types/graphql';
import { useSetRecoilState } from 'recoil';
import { userState } from '@src/recoils';

export function useSetUser(data?: Pick<Mutation, 'login'> | null) {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (data) {
      const { token, refresh_token, user } = data.login;

      AsyncStorage.multiSet([
        ['@token', token],
        ['@refresh_token', refresh_token],
      ]).then(() => setUser(user));
    }
  }, [data, setUser]);
}
