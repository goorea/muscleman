import { Dispatch, SetStateAction, useCallback } from 'react';

import { Training } from '@src/types/graphql';

const useInfoModal = (
  setVisibleTraining: Dispatch<SetStateAction<Training | undefined>>,
): {
  showInfoModal: (training: Training) => void;
  hideInfoModal: () => void;
} => ({
  showInfoModal: (training: Training) => setVisibleTraining(training),
  hideInfoModal: useCallback(
    () => setVisibleTraining(undefined),
    [setVisibleTraining],
  ),
});

export default useInfoModal;
