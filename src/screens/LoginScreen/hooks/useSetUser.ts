import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Mutation, User } from '@src/types/graphql';
import { SetterOrUpdater } from 'recoil';

export function useSetUser(
  setUser: SetterOrUpdater<User | undefined>,
  data?: Pick<Mutation, 'login'> | null,
) {
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
