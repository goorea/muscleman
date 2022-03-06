import { transparentize } from 'polished';
import styled from 'styled-components/native';

import Button from '@src/components/Button';
import Text from '@src/components/Text';

export const IconButton = styled(Button)`
  margin: 0 3px;
`;

export const VolumeContainer = styled.TouchableOpacity<{
  isFirst: boolean;
  selected: boolean;
}>`
  padding: 6px 10px;
  border-top-width: ${({ isFirst }) => (isFirst ? 0 : 1)}px;
  border-top-color: ${({ theme }) => theme.greyOutline};
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, selected }) =>
    selected ? transparentize(0.7, theme.primary) : theme.background};
`;

export const DragVolumeButton = styled(Button)`
  padding: 0 4px;
`;

export const FilledText = styled(Text)`
  width: 22%;
  text-align: right;
`;

export const SetButtonGroup = styled.View`
  margin-left: auto;
  padding-left: 10px;
  flex-direction: row;
  align-items: center;
`;
