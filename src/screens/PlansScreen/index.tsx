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
import Icon from '@src/components/Icon';
import PlanCalendar from '@src/components/PlanCalendar';
import Text from '@src/components/Text';
import { getTrainingTypeForKorean } from '@src/functions';
import { plansState } from '@src/recoils';
import { Plan } from '@src/types/graphql';
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
  PlanContainer,
  VolumeContainer,
  VolumnText,
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
  const plansBySelectedDate = useRecoilValue<Plan[]>(plansState).filter(
    ({ plannedAt }) => dayjs(plannedAt).isSame(selectedDate, 'day'),
  );

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
                dayjs(selectedDate).isSame(new Date(), 'day') ? '????????? ' : ''
              }?????? ${plansBySelectedDate.length ? '????????????' : '????????????'}`}
            />

            {plansBySelectedDate.map(plan => (
              <PlanContainer key={plan._id}>
                <Text weight="bold">
                  {getTrainingTypeForKorean(plan.training.type)} |{' '}
                  {plan.training.name} {plan.volumes?.length}??????
                </Text>

                {plan.volumes?.map((volume, i) => (
                  <VolumeContainer key={i}>
                    <Text color="grey3">
                      <Text color="grey3" italic={true}>
                        {i + 1}??????
                      </Text>{' '}
                      {volume.weight}kg x {volume.count}???
                    </Text>
                    <VolumnText color="grey3">
                      {(volume.weight || 0) * (volume.count || 0)}kg
                    </VolumnText>
                    <Icon
                      type="feather"
                      name={volume.complete ? 'check-square' : 'square'}
                      color={volume.complete ? 'success' : 'warning'}
                      size={20}
                    />
                  </VolumeContainer>
                ))}
              </PlanContainer>
            ))}
          </Wrapper>
        </Container>
      </ScrollView>

      <CopyModal ref={copyModalRef} selectedDate={selectedDate} />

      <ConfirmModal
        ref={confirmModalRef}
        message="?????? ?????????????????????????"
        onConfirm={deletePlans}
        loading={loading}
      />
    </>
  );
};

export default PlansScreen;
