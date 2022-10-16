import styled from 'styled-components/native';

import Button from '@src/components/Button';
import Image from '@src/components/Image';

export const Container = styled.View`
  padding: 20px;
`;

export const Thumbnail = styled(Image)`
  margin-top: 10px;
  width: 100%;
  height: 280px;
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
