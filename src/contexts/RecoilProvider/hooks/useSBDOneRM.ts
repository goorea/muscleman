import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { GET_SBD_ONE_RM, SBDOneRM } from '@src/operations/queries/getOneRM';
import { SBDOneRMState } from '@src/recoils';

const useSBDOneRm = (): { loading: boolean } => {
  const setSBDOneRM = useSetRecoilState<SBDOneRM>(SBDOneRMState);
  const { data, loading } = useQuery<SBDOneRM>(GET_SBD_ONE_RM);

  useEffect(() => {
    if (data) {
      setSBDOneRM(data);
    }
  }, [data, setSBDOneRM]);

  return { loading };
};

export default useSBDOneRm;
