import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { userState } from '@src/recoils';
import { Mutation } from '@src/types/graphql';

const useSetUser = (data?: Pick<Mutation, 'login'> | null) => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (data) {
      const { token, refreshToken, user } = data.login;

      AsyncStorage.multiSet([
        ['@token', token],
        ['@refreshToken', refreshToken],
      ]).then(() => setUser(user));
    }
  }, [data, setUser]);
};

export default useSetUser;
