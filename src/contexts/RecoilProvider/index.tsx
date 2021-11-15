import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import useSBDOneRm from './hooks/useSBDOneRM';
import useUser from './hooks/useUser';

const RecoilProvider: React.FC = ({ children }) => {
  const { loading: userLoading } = useUser();
  const { loading: SBDOneRMLoading } = useSBDOneRm();

  useEffect(() => {
    if (!userLoading && !SBDOneRMLoading) {
      SplashScreen.hide();
    }
  }, [userLoading, SBDOneRMLoading]);

  return <>{children}</>;
};

export default RecoilProvider;
