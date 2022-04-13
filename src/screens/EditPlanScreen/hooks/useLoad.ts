import { pick, uniqBy, uniqueId } from 'lodash';
import { MutableRefObject, useCallback, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { PreviousPlansModalElement } from '@src/components/PreviousPlansModal';
import { selectedPlansState } from '@src/components/PreviousPlansModal/recoils';
import { editingPlansState } from '@src/screens/EditPlanScreen/recoils';
import { EditingPlan } from '@src/types';
import { Plan } from '@src/types/graphql';

const useLoad = (
  plannedAt: string,
): {
  previousPlansModalRef: MutableRefObject<PreviousPlansModalElement | null>;
  showPreviousPlans: () => void;
  onLoad: () => void;
} => {
  const previousPlansModalRef = useRef<PreviousPlansModalElement>(null);
  const [selectedPlans, setSelectedPlans] =
    useRecoilState<Plan[]>(selectedPlansState);
  const setEditingPlans = useSetRecoilState<EditingPlan[]>(editingPlansState);

  const showPreviousPlans = useCallback(
    () => previousPlansModalRef.current?.show(),
    [],
  );

  const onLoad = useCallback(() => {
    setEditingPlans(prevEditingPlans => {
      const selectedPlansTrainingIds = selectedPlans.map(
        ({ training }) => training._id,
      );

      return prevEditingPlans
        .filter(
          ({ training }) => !selectedPlansTrainingIds.includes(training._id),
        )
        .concat(
          uniqBy([...selectedPlans].reverse(), 'training._id').map(
            selectedPlan =>
              ({
                ...selectedPlan,
                _id: uniqueId(),
                plannedAt,
                volumes: selectedPlan.volumes?.map(volume => ({
                  ...pick(volume, [
                    'complete',
                    'count',
                    'distances',
                    'times',
                    'weight',
                  ]),
                  _id: uniqueId(),
                })),
              } as EditingPlan),
          ),
        );
    });

    previousPlansModalRef.current?.hide();
    setSelectedPlans([]);
  }, [plannedAt, selectedPlans, setEditingPlans, setSelectedPlans]);

  return {
    previousPlansModalRef,
    showPreviousPlans,
    onLoad,
  };
};

export default useLoad;
