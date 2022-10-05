import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import React from 'react';
import { ScrollView } from 'react-native';
import { useRecoilValue } from 'recoil';

import Button from '@src/components/Button';
import ConfirmModal from '@src/components/ConfirmModal';
import CopyModal from '@src/components/CopyModal';
import Plan from '@src/components/Plan';
import PlanCalendar from '@src/components/PlanCalendar';
import { plansState } from '@src/recoils';
import { Plan as PlanType } from '@src/types/graphql';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';

import useCopy from './hooks/useCopy';
import useDates from './hooks/useDates';
import useDelete from './hooks/useDelete';
import useEvents from './hooks/useEvents';
import {
  ButtonWrapper,
  Container,
  CopyButton,
  DeleteButton,
  Wrapper,
} from './styled';

type P = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Plans'>,
  NativeStackScreenProps<RootStackParamList>
>;

const PlansScreen: React.FC<P> = ({ navigation, route }) => {
  const { selectedDate, onSelectDate, onPlanning } = useEvents({
    navigation,
    route,
  });
  const { completeDates, plannedDates } = useDates();
  const { copyModalRef, copyButtonNode, showCopyPlanModal } = useCopy();
  const {
    confirmModalRef,
    loading,
    deleteButtonNode,
    showDeletePlanModal,
    deletePlans,
  } = useDelete(selectedDate);
  const plansBySelectedDate = useRecoilValue<PlanType[]>(plansState)
    .filter(({ plannedAt }) => dayjs(plannedAt).isSame(selectedDate, 'day'))
    .sort((a, b) => {
      const trainingNameOfA = a.training.name.toLowerCase();
      const trainingNameOfB = b.training.name.toLowerCase();

      if (trainingNameOfA < trainingNameOfB) {
        return -1;
      } else if (trainingNameOfA > trainingNameOfB) {
        return 1;
      }
      return 0;
    });

  return (
    <>
      <ScrollView>
        <Container>
          <PlanCalendar
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
            completeDates={completeDates}
            plannedDates={plannedDates}
          />

          <Wrapper>
            {!!plansBySelectedDate.length && (
              <ButtonWrapper>
                <CopyButton
                  onPress={showCopyPlanModal}
                  node={copyButtonNode}
                  type="outline"
                  color="success"
                />
                <DeleteButton
                  onPress={showDeletePlanModal}
                  node={deleteButtonNode}
                  type="outline"
                  color="error"
                />
              </ButtonWrapper>
            )}

            <Button
              onPress={onPlanning}
              title={`${
                dayjs(selectedDate).isSame(new Date(), 'day') ? '오늘의 ' : ''
              }운동 ${plansBySelectedDate.length ? '수정하기' : '계획하기'}`}
            />

            {plansBySelectedDate.map(plan => (
              <Plan key={plan._id} plan={plan} />
            ))}
          </Wrapper>
        </Container>
      </ScrollView>

      <CopyModal ref={copyModalRef} selectedDate={selectedDate} />

      <ConfirmModal
        ref={confirmModalRef}
        message="정말 삭제하시겠습니까?"
        onConfirm={deletePlans}
        loading={loading}
      />
    </>
  );
};

export default PlansScreen;
