import dayjs from 'dayjs';
import React from 'react';

import Button from '@src/components/Button';
import PlanCalendar from '@src/components/PlanCalendar';
import Text from '@src/components/Text';
import DefaultModal, {
  DefaultModalElement,
} from '@src/components/modals/DefaultModal';
import useDefaultModal from '@src/components/modals/DefaultModal/hooks/useDefaultModal';
import useDates from '@src/screens/PlansScreen/hooks/useDates';

import useCopy from './hooks/useCopy';
import { Wrapper } from './styled';

export type CopyModalElement = DefaultModalElement & {};

type P = {
  selectedDate: string;
};

const CopyModal: React.ForwardRefRenderFunction<CopyModalElement, P> = (
  { selectedDate },
  ref,
) => {
  const { defaultModalRef, hide } = useDefaultModal(ref);
  const { node, loading, copiedAt, setCopiedAt, handleCopy } = useCopy(
    selectedDate,
    hide,
  );
  const { completeDates, plannedDates } = useDates();

  return (
    <DefaultModal ref={defaultModalRef}>
      <Wrapper>
        <Text weight="bold" size={20}>
          {dayjs(selectedDate).format('MMMM D일')} 운동 복사하기
        </Text>
      </Wrapper>

      <PlanCalendar
        selectedDate={copiedAt}
        onSelectDate={setCopiedAt}
        completeDates={[copiedAt]}
        plannedDates={plannedDates}
        disableDates={[...completeDates, selectedDate]}
      />

      <Wrapper>
        <Button
          node={node}
          onPress={handleCopy}
          disabled={dayjs(copiedAt).isSame(selectedDate, 'day')}
          loading={loading}
        />
      </Wrapper>
    </DefaultModal>
  );
};

export default React.forwardRef(CopyModal);
