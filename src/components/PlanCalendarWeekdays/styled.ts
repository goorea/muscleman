import styled from 'styled-components/native';

import Text from '@src/components/Text';

export const Container = styled.View`
  flex-direction: row;
  padding: 8px 0;
`;

export const WeekDay = styled(Text)`
  width: ${() => 60 / 7}%;
  margin: 0 ${() => 40 / (7 * 2)}%;
  text-align: center;
`;
