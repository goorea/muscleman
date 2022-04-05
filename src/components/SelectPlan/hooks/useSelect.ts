import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { selectedPlans as selectedPlansAtom } from '@src/components/PreviousPlansModal/recoils';
import { Plan } from '@src/types/graphql';

const useSelect = (
  plan: Plan,
): {
  selected: boolean;
  onToggleSelect: () => void;
} => {
  const [selectedPlans, setSelectedPlans] =
    useRecoilState<Plan[]>(selectedPlansAtom);
  const selected = selectedPlans.some(
    selectedPlan => selectedPlan._id === plan._id,
  );

  const onToggleSelect = useCallback(
    () =>
      setSelectedPlans(prevSelectedPlans =>
        selected
          ? prevSelectedPlans.filter(
              selectedPlan => selectedPlan._id !== plan._id,
            )
          : prevSelectedPlans.concat(plan),
      ),
    [plan, selected, setSelectedPlans],
  );

  return {
    selected,
    onToggleSelect,
  };
};

export default useSelect;
