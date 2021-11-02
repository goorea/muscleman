import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import Svg from 'react-native-svg';

import Text from '@src/components/Text';
import { AuthStackParamList, RootStackParamList } from '@src/types/navigation';

import usePlay from './hooks/usePlay';
import {
  Container,
  CircleContainer,
  Check,
  Circle,
  CheckContainer,
  WelcomeText1,
  WelcomeText2,
} from './styled';

type P = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'SuccessModal'>,
  NativeStackScreenProps<RootStackParamList>
>;

const SuccessModalScreen: React.FC<P> = ({ navigation, route }) => {
  const { rotateX, rotateY, strokeDashoffset } = usePlay(navigation);

  return (
    <Container>
      <Text color="grey2">{route.params.type} 완료!</Text>
      <WelcomeText1 weight="bold" size={28}>
        {route.params.userName}님,
      </WelcomeText1>
      <WelcomeText2 weight="bold" size={28}>
        환영합니다!
      </WelcomeText2>
      <CircleContainer>
        <Circle style={{ transform: [{ rotateX }, { rotateY }] }} />

        <CheckContainer>
          <Svg width="110" height="110" viewBox="0 0 154 154">
            <Check
              strokeDashoffset={strokeDashoffset}
              points="43.5,77.8 63.7,97.9 112.2,49.4"
            />
          </Svg>
        </CheckContainer>
      </CircleContainer>
    </Container>
  );
};

export default SuccessModalScreen;
