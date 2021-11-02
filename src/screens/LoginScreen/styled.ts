import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import Button from '@src/components/Button';
import Text from '@src/components/Text';
import { flexCenter, flexFill } from '@src/styles/flex';

export const Container = styled.View<{ headerHeight: number }>`
  height: ${({ headerHeight }) =>
    Dimensions.get('window').height - headerHeight}px;
  padding: 42px 30px 30px;
`;

export const TitleContainer = styled.View`
  align-items: center;
`;

export const Greeting = styled(Text)`
  margin-top: 16px;
`;

export const Submit = styled(Button)`
  margin-top: 20px;
`;

export const SNSTitleContainer = styled.View`
  margin-top: 30px;
  flex-direction: row;
  align-items: center;
`;

export const Line = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.grey5};
  ${flexFill}
`;

export const SNSTitle = styled(Text)`
  padding: 0 10px;
`;

export const SNSButtonsContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0 30px;
`;

export const SNSButton = styled(Button)`
  padding: 0;
  width: 46px;
  height: 46px;
  border-radius: 23px;
`;

export const LinksContainer = styled.View`
  margin-top: auto;
  flex-direction: row;
  ${flexCenter}
`;

export const Divider = styled(Text)`
  margin: 0 10px;
`;

export const ErrorMessage = styled(Text)`
  margin-top: 10px;
`;
