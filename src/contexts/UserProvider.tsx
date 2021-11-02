import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { useMeLazyQuery } from '@src/hooks/queries/useMeLazyQuery';
import { userState } from '@src/recoils';

const UserProvider: React.FC = ({ children }) => {
  const setUser = useSetRecoilState(userState);
  const [me, { data }] = useMeLazyQuery();

  useEffect(() => {
    AsyncStorage.getItem('@token').then(token => {
      if (token) {
        me();
      }
    });
  }, [me]);

  useEffect(() => {
    if (data) {
      setUser(data?.me);
    }
  }, [setUser, data]);

  return <>{children}</>;
};

export default UserProvider;
