import styled from 'styled-components/native';

import Button from '@src/components/Button';

export const MessageContainer = styled.View`
  padding: 30px;
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.primary};
`;

export const StyledButton = styled(Button)`
  flex: 0 0 50%;
`;
