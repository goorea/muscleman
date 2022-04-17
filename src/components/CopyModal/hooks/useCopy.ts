import dayjs from 'dayjs';
import { pick } from 'lodash';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { flash } from '@src/functions';
import { useMultipleCreateOrUpdatePlansMutation } from '@src/operations/mutations/multipleCreateOrUpdatePlans';
import { plansState } from '@src/recoils';
import { Plan } from '@src/types/graphql';

const useCopy = (
  selectedDate: string,
  hide: () => void,
): {
  loading: boolean;
  copiedAt: string;
  setCopiedAt: Dispatch<SetStateAction<string>>;
  handleCopy: () => Promise<void>;
} => {
  const [multipleCreateOrUpdatePlans, { loading }] =
    useMultipleCreateOrUpdatePlansMutation(() => {
      hide();
      flash({
        type: 'success',
        title: '복사완료',
        contents: '정상적으로 복사 되었습니다.',
      });
    });
  const plans = useRecoilValue<Plan[]>(plansState);
  const [copiedAt, setCopiedAt] = useState<string>(
    dayjs().format('YYYY-MM-DD'),
  );

  const handleCopy = useCallback(async () => {
    await multipleCreateOrUpdatePlans({
      variables: {
        inputs: plans
          .filter(({ plannedAt }) =>
            dayjs(plannedAt).isSame(selectedDate, 'day'),
          )
          .map(plan => ({
            plannedAt: copiedAt,
            training: plan.training._id,
            volumes:
              plan.volumes?.map(volume => ({
                ...pick(volume, [
                  'complete',
                  'count',
                  'distances',
                  'times',
                  'weight',
                ]),
              })) || [],
          })),
      },
    });
  }, [copiedAt, multipleCreateOrUpdatePlans, plans, selectedDate]);

  return {
    loading,
    copiedAt,
    setCopiedAt,
    handleCopy,
  };
};

export default useCopy;
