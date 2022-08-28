import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import { flash } from '@src/functions';
import { SBDOneRM } from '@src/operations/queries/getOneRM';
import { SBDOneRMState, plansState, userState } from '@src/recoils';
import { Plan, User } from '@src/types/graphql';

const useLogout = (): { logout: () => void } => {
  const setUser = useSetRecoilState<User | undefined>(userState);
  const setSBDOneRM = useSetRecoilState<SBDOneRM>(SBDOneRMState);
  const setPlans = useSetRecoilState<Plan[]>(plansState);

  return {
    logout: useCallback(async () => {
      await AsyncStorage.multiRemove(['@token', '@refreshToken']);
      setUser(undefined);
      setSBDOneRM({
        squat: 0,
        benchPress: 0,
        deadlift: 0,
      });
      setPlans([]);

      flash({
        title: '로그아웃',
        contents: '또 방문해주세요 :)',
        type: 'success',
      });
    }, [setUser, setSBDOneRM, setPlans]),
  };
};

export default useLogout;
