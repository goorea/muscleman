import styled from 'styled-components/native';

import Button from '@src/components/Button';
import Image from '@src/components/Image';
import { flexCenter } from '@src/styles/flex';
import { Maybe } from '@src/types/graphql';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 6px 0;
`;

export const TrainingImage = styled(Image)`
  width: 75px;
  height: 75px;
  margin-right: 6px;
`;

export const ButtonGroup = styled.View`
  margin-left: auto;
  flex-direction: row;
`;

export const RoundedButton = styled(Button)`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  padding: 0;
  ${flexCenter};
`;

export const SetButton = styled(RoundedButton)`
  background-color: ${({ theme }) => theme.primary};
`;

export const CompleteButton = styled(RoundedButton)<{
  complete?: Maybe<boolean>;
}>`
  background-color: ${({ theme, complete }) =>
    theme[complete ? 'success' : 'warning']};
  margin-left: 6px;
`;
