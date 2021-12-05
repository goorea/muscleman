import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import usePlans from './hooks/usePlans';
import useSBDOneRm from './hooks/useSBDOneRM';
import useUser from './hooks/useUser';

const RecoilProvider: React.FC = ({ children }) => {
  const { loading: userLoading } = useUser();
  const { loading: SBDOneRMLoading } = useSBDOneRm();
  const { loading: plansLoading } = usePlans();
  const loading = userLoading || SBDOneRMLoading || plansLoading;

  useEffect(() => {
    if (!loading) {
      SplashScreen.hide();
    }
  }, [loading]);

  return <>{children}</>;
};

export default RecoilProvider;
