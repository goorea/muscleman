import styled from 'styled-components/native';

import Button from '@src/components/Button';
import Image from '@src/components/Image';

export const Container = styled.ScrollView`
  padding: 20px;
`;

export const UserContainer = styled(Button)`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const ProfileImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

export const PlansContainer = styled.View`
  margin-top: 40px;
`;

export const EmptyPlansContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;

export const Notice = styled(Button)`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  padding: 0;
  margin-right: 10px;
`;

export const ToPlan = styled(Button)`
  border-radius: 8px;
  margin-left: 10px;
  padding-left: 0;
  padding-right: 0;
  flex: 1;
`;
