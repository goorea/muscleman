import styled, { css } from 'styled-components/native';

import Button from '@src/components/Button';
import Text from '@src/components/Text';

export const Container = styled.View`
  padding: 20px 0;
`;

export const Wrapper = styled.View`
  margin-top: 10px;
  padding: 0 20px;
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const CopyButton = styled(Button)`
  flex: 1;
`;

export const DeleteButton = styled(Button)`
  flex: 1;
  margin-left: 10px;
`;

export const ButtonBody = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ButtonTitle = styled(Text)`
  margin-left: 4px;
`;

interface Props {
  select: boolean;
}

export const PlanContainer = styled.TouchableOpacity<Props>`
  border: ${({ select, theme }) =>
    select
      ? css`3px solid ${theme.primary}`
      : css`1px solid ${theme.greyOutline}`}
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
`;

export const VolumeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
`;

export const VolumnText = styled(Text)`
  margin-left: auto;
  margin-right: 4px;
`;
