import { gql, QueryResult, useLazyQuery } from '@apollo/client';
import { OperationVariables } from '@apollo/client/core';
import { QueryLazyOptions } from '@apollo/client/react/types/types';
import { useSetRecoilState } from 'recoil';

import { SBDOneRMState } from '@src/recoils';

export const GET_ONE_RM = gql`
  query getOneRM($name: String!) {
    getOneRM(name: $name)
  }
`;

export interface SBDOneRM {
  squat: number;
  benchPress: number;
  deadlift: number;
}

export const GET_SBD_ONE_RM = gql`
  query getSDBOneRM {
    squat: getOneRM(name: "바벨 백스쿼트")
    benchPress: getOneRM(name: "벤치 프레스")
    deadlift: getOneRM(name: "데드리프트")
  }
`;

export const useSBDOneRM = (
  callback: () => any | undefined = () => null,
): [
  (options?: QueryLazyOptions<OperationVariables>) => void,
  Pick<QueryResult<SBDOneRM>, 'loading'>,
] => {
  const setSBDOneRM = useSetRecoilState<SBDOneRM>(SBDOneRMState);

  const [getSBDOneRM, { loading }] = useLazyQuery<SBDOneRM>(GET_SBD_ONE_RM, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setSBDOneRM(data);
      callback();
    },
  });

  return [getSBDOneRM, { loading }];
};
