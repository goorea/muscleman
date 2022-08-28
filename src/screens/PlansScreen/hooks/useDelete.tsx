import dayjs from 'dayjs';
import React, { useCallback, useMemo, useRef } from 'react';
import { useRecoilState } from 'recoil';

import { ConfirmModalElement } from '@src/components/ConfirmModal';
import Icon from '@src/components/Icon';
import { flash } from '@src/functions';
import useIconProps from '@src/hooks/useIconProps';
import useDeletePlanMutation from '@src/operations/mutations/deletePlan';
import { plansState } from '@src/recoils';
import { Plan } from '@src/types/graphql';

import { ButtonBody, ButtonTitle } from '../styled';

const useDelete = (selectedDate: string) => {
  const [plans, setPlans] = useRecoilState<Plan[]>(plansState);
  const plansBySelectedDate: Plan[] = plans.filter(({ plannedAt }) =>
    dayjs(plannedAt).isSame(selectedDate, 'day'),
  );
  const [deletePlan, { loading }] = useDeletePlanMutation();
  const confirmModalRef = useRef<ConfirmModalElement | null>(null);
  const { deleteIconProps } = useIconProps(false);
  const deleteButtonNode = useMemo(
    () => (
      <ButtonBody>
        <Icon {...deleteIconProps} />
        <ButtonTitle weight="bold" color="error">
          삭제
        </ButtonTitle>
      </ButtonBody>
    ),
    [deleteIconProps],
  );

  const showDeletePlanModal = useCallback(
    () => confirmModalRef.current?.show(),
    [],
  );

  const deletePlans = useCallback(async () => {
    const plansIds = plansBySelectedDate.map(({ _id }) => _id);
    await Promise.all(
      plansIds.map(_id =>
        deletePlan({
          variables: {
            _id,
          },
        }),
      ),
    );
    setPlans(prevState =>
      prevState.filter(({ _id }) => !plansIds.includes(_id)),
    );
    confirmModalRef.current?.hide();
    flash({
      type: 'error',
      title: '삭제',
      contents: '선택한 운동 계획이 삭제되었습니다.',
    });
  }, [deletePlan, plansBySelectedDate, setPlans]);

  return {
    confirmModalRef,
    loading,
    deleteButtonNode,
    showDeletePlanModal,
    deletePlans,
  };
};

export default useDelete;
