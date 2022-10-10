import styled from 'styled-components/native';

import Button from '@src/components/Button';
import { flexCenter, flexFillCenter } from '@src/styles/flex';

export const NotLoginContainer = styled.View`
  ${flexFillCenter}
`;

export const Circle = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.primary};
  margin-top: 10px;
  ${flexCenter};
`;

export const LoginButton = styled(Button)`
  margin-top: 20px;
  border-radius: 8px;
`;
