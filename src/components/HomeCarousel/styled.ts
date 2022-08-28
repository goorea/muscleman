import LinearGradient from 'react-native-linear-gradient';
import Svg from 'react-native-svg';
import styled from 'styled-components/native';

import Button from '@src/components/Button';
import Text from '@src/components/Text';

export const Container = styled(LinearGradient)`
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

export const Date = styled(Text)`
  margin-left: 4px;
`;

export const Body = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const ContentContainer = styled.View`
  align-items: center;
`;

export const ContentSvg = styled(Svg)`
  margin-top: 4px;
  margin-bottom: 10px;
`;

export const LoginContainer = styled.View`
  margin: 20px 0 40px;
  align-items: center;
`;

export const LoginButton = styled(Button)`
  margin-top: 10px;
  border-radius: 8px;
`;

export const Bullets = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`;

export const Bullet = styled.View<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin: 0 2px;
  background-color: ${({ theme, active }) => theme[active ? 'error' : 'grey4']};
`;
