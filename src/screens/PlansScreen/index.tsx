import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import React from 'react';
import { ScrollView } from 'react-native';
import { useRecoilValue } from 'recoil';

import Button from '@src/components/Button';
import Icon from '@src/components/Icon';
import PlanCalendar from '@src/components/PlanCalendar';
import Text from '@src/components/Text';
import { getTrainingTypeForKorean } from '@src/functions';
import { plansState } from '@src/recoils';
import { Plan } from '@src/types/graphql';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';

import useDates from './hooks/useDates';
import useEvents from './hooks/useEvents';
import {
  Container,
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
  const plansBySelectedDate: Plan[] = useRecoilValue<Plan[]>(plansState).filter(
    ({ plannedAt }) => dayjs(plannedAt).isSame(selectedDate, 'day'),
  );

  return (
    <ScrollView>
      <Container>
        <PlanCalendar
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
          completeDates={completeDates}
          plannedDates={plannedDates}
        />

        <Wrapper>
          <Button
            onPress={onPlanning}
            title={`${
              dayjs(selectedDate).isSame(new Date(), 'day') ? '오늘의 ' : ''
            }운동 ${plansBySelectedDate.length ? '수정하기' : '계획하기'}`}
          />

          {plansBySelectedDate.map(plan => (
            <PlanContainer key={plan._id}>
              <Text weight="bold">
                {getTrainingTypeForKorean(plan.training.type)} |{' '}
                {plan.training.name} {plan.volumes?.length}세트
              </Text>

              {plan.volumes?.map((volume, i) => (
                <VolumeContainer key={i}>
                  <Text color="grey3">
                    <Text color="grey3" italic={true}>
                      {i + 1}세트
                    </Text>{' '}
                    {volume.weight}kg x {volume.count}회
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
  );
};

export default PlansScreen;
