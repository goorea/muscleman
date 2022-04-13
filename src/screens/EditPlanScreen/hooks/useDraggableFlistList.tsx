import dayjs from 'dayjs';
import React, { useCallback, ReactElement } from 'react';
import { RenderItemParams } from 'react-native-draggable-flatlist';
import {
  DragEndParams,
  RenderItem,
} from 'react-native-draggable-flatlist/src/types';
import { useSetRecoilState } from 'recoil';

import Button from '@src/components/Button';
import EditPlan from '@src/components/EditPlan';
import Icon from '@src/components/Icon';
import Text from '@src/components/Text';
import { editingPlansState } from '@src/screens/EditPlanScreen/recoils';
import { EditingPlan } from '@src/types';

import {
  LoadPreviousPlanContainer,
  LoadPreviousPlanText,
  LoadPreviousPlanWrapper,
} from '../styled';

const useDraggableFlistList = (
  plannedAt: string,
  showPreviousPlans: () => void,
): {
  onDragEnd: (params: DragEndParams<EditingPlan>) => void;
  renderItem: RenderItem<EditingPlan>;
  ListHeaderComponent: () => ReactElement;
} => {
  const setEditingPlans = useSetRecoilState<EditingPlan[]>(editingPlansState);

  const onDragEnd = (params: DragEndParams<EditingPlan>) => {
    setEditingPlans(params.data);
  };

  const renderItem = useCallback(
    ({ item, drag }: RenderItemParams<EditingPlan>) => (
      <EditPlan editingPlan={item} drag={drag} />
    ),
    [],
  );

  const ListHeaderComponent = useCallback(
    () => (
      <>
        <Text size={20} weight="bold">
          {dayjs(plannedAt).format('MMMM D일')} 운동 계획하기
        </Text>

        <LoadPreviousPlanContainer>
          <Button
            onPress={showPreviousPlans}
            type="clear"
            node={
              <LoadPreviousPlanWrapper>
                <Icon type="fontisto" name="import" size={16} />
                <LoadPreviousPlanText>이전 계획 불러오기</LoadPreviousPlanText>
              </LoadPreviousPlanWrapper>
            }
          />
        </LoadPreviousPlanContainer>
      </>
    ),
    [plannedAt, showPreviousPlans],
  );

  return {
    onDragEnd,
    renderItem,
    ListHeaderComponent,
  };
};

export default useDraggableFlistList;
