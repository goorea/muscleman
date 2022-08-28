import { useEffect } from 'react';

import { useSBDOneRM } from '@src/operations/queries/getOneRM';

const useSBDOneRm = (): { loading: boolean } => {
  const [getSBDOneRM, { loading }] = useSBDOneRM();

  useEffect(() => {
    getSBDOneRM();
  }, [getSBDOneRM]);

  return { loading };
};

export default useSBDOneRm;
