import { Animated } from 'react-native';
import { Polyline } from 'react-native-svg';
import styled from 'styled-components/native';
import { flexCenter, flexFillCenter } from '@src/styles/flex';
import Text from '@src/components/Text';
import { positionAbsoluteFill } from '@src/styles/position';

const AnimatedPolyline = Animated.createAnimatedComponent<Polyline>(Polyline);

export const Container = styled.View`
  ${flexFillCenter}
`;

export const WelcomeText1 = styled(Text)`
  margin-top: 10px;
`;

export const WelcomeText2 = styled(Text)`
  margin-top: -2px;
`;

export const CircleContainer = styled.View`
  margin-top: 24px;
`;

export const Circle = styled(Animated.View)`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border: 3px solid ${props => props.theme.primary};
  transform: perspective(500);
`;

export const CheckContainer = styled.View`
  ${positionAbsoluteFill}
  ${flexCenter}
`;

export const Check = styled(AnimatedPolyline)`
  stroke-linecap: round;
  stroke: ${props => props.theme.primary};
  stroke-width: 10px;
  stroke-dasharray: 200px;
`;
