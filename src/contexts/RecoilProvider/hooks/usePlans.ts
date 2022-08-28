import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { PLANS } from '@src/operations/queries/plans';
import { plansState } from '@src/recoils';
import { Query } from '@src/types/graphql';

const usePlans = (): { loading: boolean } => {
  const setPlans = useSetRecoilState(plansState);
  const { data, loading } = useQuery<Pick<Query, 'plans'>>(PLANS, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data) {
      setPlans(data?.plans);
    }
  }, [setPlans, data]);

  return { loading };
};

export default usePlans;
