import dayjs from 'dayjs';
import { pick } from 'lodash';
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import * as ReactNative from 'react-native';
import { useRecoilValue } from 'recoil';
import { ReactNativeThemedStyledFunction } from 'styled-components/native';

import Icon from '@src/components/Icon';
import { flash } from '@src/functions';
import { useMultipleCreateOrUpdatePlansMutation } from '@src/operations/mutations/multipleCreateOrUpdatePlans';
import { plansState } from '@src/recoils';
import { Plan } from '@src/types/graphql';

import { CopyButtonBody, CopyButtonTitle } from '../styled';

const useCopy = (
  selectedDate: string,
  hide: () => void,
): {
  node: ReactElement<
    ReactNativeThemedStyledFunction<typeof ReactNative.View, {}>
  >;
  loading: boolean;
  copiedAt: string;
  setCopiedAt: Dispatch<SetStateAction<string>>;
  handleCopy: () => Promise<void>;
} => {
  const node = useMemo(
    () => (
      <CopyButtonBody>
        <Icon type="ionicon" name="copy" color="white" size={16} />
        <CopyButtonTitle color="white" weight="bold">
          복사하기
        </CopyButtonTitle>
      </CopyButtonBody>
    ),
    [],
  );
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
    node,
    loading,
    copiedAt,
    setCopiedAt,
    handleCopy,
  };
};

export default useCopy;
