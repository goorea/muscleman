import styled from 'styled-components/native';

import Text from '@src/components/Text';

export const Container = styled.View`
  padding: 20px 0;
`;

export const Wrapper = styled.View`
  margin-top: 10px;
  padding: 0 20px;
`;

export const PlanContainer = styled.View`
  border: 1px solid ${({ theme }) => theme.greyOutline};
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
