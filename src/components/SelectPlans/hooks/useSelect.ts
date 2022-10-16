import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { selectedPlansState } from '@src/components/modals/PreviousPlansModal/recoils';
import { Plan } from '@src/types/graphql';

const useSelect = (
  plans: Plan[],
): {
  selected: boolean;
  onToggleSelect: () => void;
} => {
  const [selectedPlans, setSelectedPlans] =
    useRecoilState<Plan[]>(selectedPlansState);
  const selectedPlansIds = selectedPlans.map(({ _id }) => _id);
  const selected = plans.every(({ _id }) => selectedPlansIds.includes(_id));

  const onToggleSelect = useCallback(() => {
    const plansIds = plans.map(({ _id }) => _id);
    setSelectedPlans(prevSelectedPlans =>
      selected
        ? prevSelectedPlans.filter(({ _id }) => !plansIds.includes(_id))
        : prevSelectedPlans.concat(
            plans.filter(({ _id }) => !selectedPlansIds.includes(_id)),
          ),
    );
  }, [plans, selected, selectedPlansIds, setSelectedPlans]);

  return {
    selected,
    onToggleSelect,
  };
};

export default useSelect;
