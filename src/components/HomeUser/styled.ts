import styled from 'styled-components/native';

import Image from '@src/components/Image';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProfileImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;
