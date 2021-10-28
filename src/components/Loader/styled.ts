import styled from 'styled-components/native';
import { flexFillCenter } from '@src/styles/flex';
import Text from '@src/components/Text';

export const Container = styled.View`
  background-color: ${props => props.theme.background};
  ${flexFillCenter}
`;

export const Title = styled(Text)`
  margin-top: 10px;
`;
