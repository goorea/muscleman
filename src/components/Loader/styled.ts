import styled from 'styled-components/native';

import Text from '@src/components/Text';
import { flexFillCenter } from '@src/styles/flex';

export const Container = styled.View`
  background-color: ${props => props.theme.background};
  ${flexFillCenter}
`;

export const Title = styled(Text)`
  margin-top: 10px;
`;
