import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useRef,
} from 'react';

import { TrainingModalElement } from '@src/components/modals/TrainingModal';
import { Training } from '@src/types/graphql';

const useInfoModal = (
  setVisibleTraining: Dispatch<SetStateAction<Training | undefined>>,
): {
  trainingModalRef: MutableRefObject<TrainingModalElement | null>;
  showInfoModal: (training: Training) => void;
  hideInfoModal: () => void;
} => {
  const trainingModalRef = useRef<TrainingModalElement | null>(null);

  return {
    trainingModalRef,
    showInfoModal: (training: Training) => {
      setVisibleTraining(training);
      trainingModalRef.current?.show();
    },
    hideInfoModal: useCallback(() => {
      trainingModalRef.current?.hide();
      setVisibleTraining(undefined);
    }, [setVisibleTraining]),
  };
};

export default useInfoModal;
