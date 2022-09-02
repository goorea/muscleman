import { gql, useMutation } from '@apollo/client';
import { FetchResult } from '@apollo/client/link/core';
import { MutationFunctionOptions, MutationResult } from '@apollo/client/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { flash } from '@src/functions';
import useErrorEffect from '@src/hooks/useErrorEffect';
import { SBDOneRM } from '@src/operations/queries/getOneRM';
import { SBDOneRMState, userState } from '@src/recoils';
import { Mutation } from '@src/types/graphql';

export const WITHDRAWAL = gql`
  mutation withdrawal {
    withdrawal
  }
`;

export const useWithdrawalMutation = (): [
  (
    options?: MutationFunctionOptions<Pick<Mutation, 'withdrawal'>>,
  ) => Promise<FetchResult<Pick<Mutation, 'withdrawal'>>>,
  Pick<MutationResult<Pick<Mutation, 'withdrawal'>>, 'loading'>,
] => {
  const [withdrawal, { data, error, loading }] =
    useMutation<Pick<Mutation, 'withdrawal'>>(WITHDRAWAL);
  const setUser = useSetRecoilState(userState);
  const setSBDOneRM = useSetRecoilState<SBDOneRM>(SBDOneRMState);

  useErrorEffect(error);

  useEffect(() => {
    if (data?.withdrawal) {
      flash({
        type: 'success',
        title: '정상적으로 회원탈퇴 되었습니다.',
        contents: '그동안 근육맨을 이용해주셔서 감사합니다.',
      });

      AsyncStorage.multiRemove(['@token', '@refreshToken']).then(() => {
        setUser(undefined);
        setSBDOneRM({
          squat: 0,
          benchPress: 0,
          deadlift: 0,
        });
      });
    }
  }, [data, setSBDOneRM, setUser]);

  return [withdrawal, { loading }];
};
