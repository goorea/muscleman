import { useLazyQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { SBDOneRM } from '@src/operations/queries/getOneRM';
import {
  GET_SBD_ONE_RM_AND_TODAY_PLANS,
  SBDOneRmAndTodayPlans,
} from '@src/operations/queries/getSBDOneRMAndTodayPlans';
import { SBDOneRMState, todayPlansState, userState } from '@src/recoils';
import { Mutation } from '@src/types/graphql';

const useSetRecoilStates = (loginData?: Pick<Mutation, 'login'> | null) => {
  const setUser = useSetRecoilState(userState);
  const setSBDOneRM = useSetRecoilState<SBDOneRM>(SBDOneRMState);
  const setTodayPlans = useSetRecoilState(todayPlansState);
  const [getSBDOneRMAndTodayPlans, { data }] =
    useLazyQuery<SBDOneRmAndTodayPlans>(GET_SBD_ONE_RM_AND_TODAY_PLANS);

  useEffect(() => {
    if (loginData) {
      const { token, refreshToken, user } = loginData.login;

      AsyncStorage.multiSet([
        ['@token', token],
        ['@refreshToken', refreshToken],
      ]).then(() => {
        setUser(user);
        getSBDOneRMAndTodayPlans();
      });
    }
  }, [loginData, setUser, getSBDOneRMAndTodayPlans]);

  useEffect(() => {
    if (data) {
      setSBDOneRM({
        squat: data.squat,
        benchPress: data.benchPress,
        deadlift: data.deadlift,
      });
      setTodayPlans(data.todayPlans);
    }
  }, [data, setSBDOneRM, setTodayPlans]);
};

export default useSetRecoilStates;
