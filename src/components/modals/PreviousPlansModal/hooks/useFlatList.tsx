import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import React, { useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import { useRecoilValue } from 'recoil';

import SelectPlans from '@src/components/SelectPlans';
import { plansState } from '@src/recoils';
import { Plan } from '@src/types/graphql';

const useFlatList = (
  plannedAt: string,
): {
  groupByPlans: { [index: string]: [Plan, ...Plan[]] };
  keyExtractor: ([date, plans]: [string, Plan[]]) => string;
  renderItem: ListRenderItem<[string, Plan[]]>;
} => {
  const groupByPlans = groupBy(
    useRecoilValue<Plan[]>(plansState)
      .filter(plan => plan.plannedAt !== plannedAt && plan.volumes)
      .sort((a, b) => dayjs(b.plannedAt).diff(a.plannedAt))
      .map(plan => ({ ...plan, selected: false })),
    'plannedAt',
  );
  const keyExtractor = useCallback(([date]) => date, []);
  const renderItem = useCallback(
    ({ item: [date, plans] }) => <SelectPlans plannedAt={date} plans={plans} />,
    [],
  );

  return {
    groupByPlans,
    keyExtractor,
    renderItem,
  };
};

export default useFlatList;
