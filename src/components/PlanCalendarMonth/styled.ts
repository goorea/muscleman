import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import Button from '@src/components/Button';

export const Month = styled(Button)`
  width: ${() => Dimensions.get('screen').width / 3}px;
  padding: 14px 0;
`;
