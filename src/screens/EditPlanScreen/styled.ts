import styled from 'styled-components/native';

import Button from '@src/components/Button';
import Text from '@src/components/Text';

export const Container = styled.View<{ dark: boolean }>`
  flex: 1;
  background-color: ${({ theme, dark }) => (dark ? theme.grey0 : theme.grey5)};
`;

export const Wrapper = styled.View`
  padding: 20px 20px 60px;
`;

export const LoadPreviousPlanContainer = styled.View`
  margin-top: 10px;
  align-items: flex-end;
`;

export const LoadPreviousPlanWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LoadPreviousPlanText = styled(Text)`
  margin-left: 4px;
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  margin-top: auto;
`;

export const AddPlanButton = styled(Button)`
  flex: 1;
`;

export const AddPlanWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AddPlanText = styled(Text)`
  margin-left: 4px;
`;

export const SubmitButton = styled(Button)`
  flex: 1;
`;
