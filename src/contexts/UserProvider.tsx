import { useLazyQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { ME } from '@src/operations/queries/me';
import { userState } from '@src/recoils';
import { Query } from '@src/types/graphql';

const UserProvider: React.FC = ({ children }) => {
  const setUser = useSetRecoilState(userState);
  const [me, { data }] = useLazyQuery<Pick<Query, 'me'>>(ME);

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
