import styled from 'styled-components/native';

import Button from '@src/components/Button';

export const Container = styled.ScrollView`
  padding: 20px;
`;

export const UserWithCalculatorContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const PlansContainer = styled.View`
  margin-top: 40px;
`;

export const EmptyPlansContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;

export const Notice = styled(Button)`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  padding: 0;
  margin-right: 10px;
`;

export const ToPlan = styled(Button)`
  border-radius: 8px;
  margin-left: 10px;
  padding-left: 0;
  padding-right: 0;
  flex: 1;
`;
