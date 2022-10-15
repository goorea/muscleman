import { useLazyQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { SBDOneRM } from '@src/operations/queries/getOneRM';
import {
  GET_SBD_ONE_RM_AND_PLANS,
  SBDOneRmAndPlans,
} from '@src/operations/queries/getSBDOneRMAndPlans';
import { SBDOneRMState, plansState, userState } from '@src/recoils';
import { AuthenticationResponse, Plan } from '@src/types/graphql';

const useSetRecoilStates = (loginData?: AuthenticationResponse) => {
  const setUser = useSetRecoilState(userState);
  const setSBDOneRM = useSetRecoilState<SBDOneRM>(SBDOneRMState);
  const setPlans = useSetRecoilState<Plan[]>(plansState);
  const [getSBDOneRMAndTodayPlans, { data }] = useLazyQuery<SBDOneRmAndPlans>(
    GET_SBD_ONE_RM_AND_PLANS,
    {
      fetchPolicy: 'network-only',
    },
  );

  useEffect(() => {
    if (loginData) {
      const { token, refreshToken, user } = loginData;

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
      setPlans(data.plans);
    }
  }, [data, setSBDOneRM, setPlans]);
};

export default useSetRecoilStates;
