import { transparentize } from 'polished';
import styled from 'styled-components/native';

import Button from '@src/components/Button';
import Image from '@src/components/Image';
import { flexFillCenter } from '@src/styles/flex';

export const Overlay = styled(Button)`
  background-color: ${({ theme }) => transparentize(0.6, theme.foreground)};
  ${flexFillCenter};
`;

export const Container = styled.View`
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
`;

export const CloseButton = styled(Button)`
  position: absolute;
  right: 5px;
  top: 5px;
`;

export const Thumbnail = styled(Image)`
  margin-top: 10px;
  width: 300px;
  height: 240px;
`;

export const CategoryContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const CategoryButton = styled(Button)`
  padding: 3px 7px;
  border-radius: 5px;
`;

export const DescriptionContainer = styled.View`
  margin-top: 10px;
`;
