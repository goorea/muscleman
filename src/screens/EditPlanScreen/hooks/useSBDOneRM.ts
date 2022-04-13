import { useLazyQuery } from '@apollo/client';
import { OperationVariables } from '@apollo/client/core';
import { QueryLazyOptions } from '@apollo/client/react/types/types';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { flash } from '@src/functions';
import { GET_SBD_ONE_RM, SBDOneRM } from '@src/operations/queries/getOneRM';
import { SBDOneRMState } from '@src/recoils';
import {
  PlanningStackParamList,
  RootStackParamList,
} from '@src/types/navigation';

const useSBDOneRM = (
  navigation: CompositeScreenProps<
    NativeStackScreenProps<PlanningStackParamList, 'EditPlan'>,
    NativeStackScreenProps<RootStackParamList>
  >['navigation'],
): {
  getSBDOneRM: (options?: QueryLazyOptions<OperationVariables>) => void;
} => {
  const setSBDOneRM = useSetRecoilState<SBDOneRM>(SBDOneRMState);

  const [getSBDOneRM, { data }] = useLazyQuery<SBDOneRM>(GET_SBD_ONE_RM, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data) {
      setSBDOneRM(data);
      flash({
        type: 'success',
        title: '운동 계획 완료',
        contents: '운동 계획을 생성했습니다',
      });
      navigation.goBack();
    }
  }, [data, navigation, setSBDOneRM]);

  return { getSBDOneRM };
};

export default useSBDOneRM;
