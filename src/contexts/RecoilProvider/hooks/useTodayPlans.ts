import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { TODAY_PLANS } from '@src/operations/queries/todayPlans';
import { todayPlansState } from '@src/recoils';
import { Query } from '@src/types/graphql';

const useTodayPlans = (): { loading: boolean } => {
  const setTodayPlans = useSetRecoilState(todayPlansState);
  const { data, loading } = useQuery<Pick<Query, 'todayPlans'>>(TODAY_PLANS);

  useEffect(() => {
    if (data) {
      setTodayPlans(data?.todayPlans);
    }
  }, [setTodayPlans, data]);

  return { loading };
};

export default useTodayPlans;
