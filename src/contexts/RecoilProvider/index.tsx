import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import useSBDOneRm from './hooks/useSBDOneRM';
import useTodayPlans from './hooks/useTodayPlans';
import useUser from './hooks/useUser';

const RecoilProvider: React.FC = ({ children }) => {
  const { loading: userLoading } = useUser();
  const { loading: SBDOneRMLoading } = useSBDOneRm();
  const { loading: todayPlansLoading } = useTodayPlans();
  const loading = userLoading || SBDOneRMLoading || todayPlansLoading;

  useEffect(() => {
    if (!loading) {
      SplashScreen.hide();
    }
  }, [loading]);

  return <>{children}</>;
};

export default RecoilProvider;
