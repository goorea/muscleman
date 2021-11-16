import { useLazyQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { ME } from '@src/operations/queries/me';
import { userState } from '@src/recoils';
import { Query } from '@src/types/graphql';

const useUser = (): { loading: boolean } => {
  const setUser = useSetRecoilState(userState);
  const [me, { data, loading }] = useLazyQuery<Pick<Query, 'me'>>(ME);

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

  return { loading };
};

export default useUser;
