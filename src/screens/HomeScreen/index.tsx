import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import HomeCarousel from '@src/components/HomeCarousel';
import Text from '@src/components/Text';
import TodayPlan from '@src/components/TodayPlan';
import { plansState } from '@src/recoils';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';

import useUser from './hooks/useUser';
import {
  Container,
  UserContainer,
  PlansContainer,
  EmptyPlansContainer,
  Notice,
  ToPlan,
} from './styled';

type P = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const HomeScreen: React.FC<P> = ({ navigation }) => {
  const todayPlans = useRecoilValue(plansState).filter(plan =>
    moment(plan.plannedAt).isSame(new Date(), 'day'),
  );
  const { onPressUser, userNode } = useUser(navigation);
  const toPlan = useCallback(() => navigation.navigate('Plans'), [navigation]);

  return (
    <Container>
      <UserContainer onPress={onPressUser} type="clear" node={userNode} />

      <HomeCarousel navigation={navigation} />

      <PlansContainer>
        <Text size={16} weight="bold">
          오늘의 운동
        </Text>

        {todayPlans.length ? (
          todayPlans.map(plan => <TodayPlan key={plan._id} plan={plan} />)
        ) : (
          <EmptyPlansContainer>
            <Notice type="outline" title="!" color="error" />
            <Text>
              오늘 계획한 운동이 없어요{'\n'}운동을 계획하러 가볼까요?
            </Text>
            <ToPlan title="운동 계획하기" onPress={toPlan} />
          </EmptyPlansContainer>
        )}
      </PlansContainer>
    </Container>
  );
};

export default HomeScreen;
