import styled from 'styled-components/native';

import Button from '@src/components/Button';

export const Day = styled(Button)`
  width: ${() => 60 / 7}%;
  height: ${() => 95 / 6}%;
  margin: ${() => 3 / (6 * 2)}% ${() => 40 / (7 * 2)}%;
  border-radius: 100px;
  padding: 0;
`;
