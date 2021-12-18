import styled from 'styled-components/native';

import Button from '@src/components/Button';

export const TabsContainer = styled.ScrollView`
  flex-direction: row;
  flex-grow: 0;
  background-color: ${({ theme }) => theme.primary};
`;

export const TabContainer = styled(Button)`
  padding: 10px 16px;
`;
