import { transparentize } from 'polished';
import styled from 'styled-components/native';

import Button from '@src/components/Button';
import Image from '@src/components/Image';

export const Container = styled.View`
  flex: 1;
`;

export const TrainingContainer = styled(Button)<{ selected: boolean }>`
  padding: 14px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, selected }) =>
    selected ? transparentize(0.7, theme.primary) : 'transparent'};
`;

export const TrainingImage = styled(Image)`
  width: 75px;
  height: 75px;
  margin-right: 8px;
`;

export const InfoButton = styled(Button)`
  margin-left: auto;
`;

export const AddButton = styled(Button)`
  margin-top: auto;
`;
