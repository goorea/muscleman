import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Mutation, User } from '@src/types/graphql';
import { SetterOrUpdater } from 'recoil';
import { useMeLazyQuery } from '@src/hooks/queries/useMeLazyQuery';

export function useSetUser(
  setUser: SetterOrUpdater<User | undefined>,
  data?: Pick<Mutation, 'login'> | null,
) {
  const [me, { data: meData }] = useMeLazyQuery();

  useEffect(() => {
    if (data) {
      const { token, refresh_token } = data.login;

      (async () => {
        await AsyncStorage.multiSet([
          ['@token', token],
          ['@refresh_token', refresh_token],
        ]);

        me();
      })();
    }
  }, [data, me]);

  useEffect(() => {
    if (meData) {
      setUser(meData.me);
    }
  }, [meData, setUser]);
}
