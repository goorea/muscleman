import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from '@src/types/navigation';
import { CompositeScreenProps } from '@react-navigation/native';
import { Animated } from 'react-native';
import { Text } from 'react-native-elements';
import Svg, { Polyline } from 'react-native-svg';
import Sound from 'react-native-sound';
import styled from 'styled-components/native';
import { flexCenter, flexFillCenter } from '@src/styles/flex';
import { positionAbsoluteFill } from '@src/styles/position';

const AnimatedPolyline = Animated.createAnimatedComponent<Polyline>(Polyline);

const Container = styled.View`
  ${flexFillCenter}
`;

const Title = styled(Text)`
  color: ${props => props.theme.grey2};
`;

const WelcomeText1 = styled(Text)`
  margin-top: 10px;
`;

const WelcomeText2 = styled(Text)`
  margin-top: -2px;
`;

const CircleContainer = styled.View`
  margin-top: 24px;
`;

const Circle = styled(Animated.View)`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border: 3px solid ${props => props.theme.primary};
  transform: perspective(500);
`;

const CheckContainer = styled.View`
  ${positionAbsoluteFill}
  ${flexCenter}
`;

const Check = styled(AnimatedPolyline)`
  stroke-linecap: round;
  stroke: ${props => props.theme.primary};
  stroke-width: 10px;
  stroke-dasharray: 200px;
`;

type P = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'SuccessModal'>,
  NativeStackScreenProps<RootStackParamList>
>;

const SuccessModalScreen: React.FC<P> = ({ navigation, route }) => {
  const sound = new Sound(require('@src/assets/alarms/success.mp4'));
  const rotateAnimation = new Animated.Value(0);
  const rotateX = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const rotateY = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '180deg'],
  });
  const checkAnimation = new Animated.Value(0);
  const strokeDashoffset = checkAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  });
  const play = () => {
    rotateAnimation.setValue(0);
    checkAnimation.setValue(0);

    setTimeout(() => sound.play(() => null), 500);

    Animated.parallel([
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(checkAnimation, {
        toValue: 1,
        duration: 700,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start(navigation.goBack);
  };

  React.useEffect(play, [play]);

  return (
    <Container>
      <Title>{route.params.type} 완료!</Title>
      <WelcomeText1 h2>{route.params.userName}님,</WelcomeText1>
      <WelcomeText2 h2>환영합니다!</WelcomeText2>
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
