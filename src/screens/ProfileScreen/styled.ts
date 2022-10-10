import styled from 'styled-components/native';

import Button from '@src/components/Button';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import { flexCenter } from '@src/styles/flex';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const EditProfileImage = styled(Button)``;

export const ProfileImage = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 10px;
`;

export const CameraContainer = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  position: absolute;
  bottom: -2px;
  right: 4px;
  background-color: ${({ theme }) => theme.background};
  border: 0.5px solid ${({ theme }) => theme.greyOutline};
  ${flexCenter};
`;

export const NicknameEmailContainer = styled.View`
  flex: 1;
`;

export const NicknameContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: ${({ theme }) => theme.greyOutline};
`;

export const EditButton = styled(Button)`
  padding: 4px;
`;

export const EmailContainer = styled.View`
  padding: 5px;
  background-color: ${({ theme }) => theme.grey5};
  margin-top: 5px;
  flex-direction: row;
  align-items: center;
`;

export const Divider = styled.View`
  width: 1px;
  height: 12px;
  background-color: ${({ theme }) => theme.greyOutline};
  margin: 0 6px;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  margin: 10px -6px 0;
`;

export const Info = styled.View`
  flex: 1;
  border-bottom-width: 0.5px;
  border-bottom-color: ${({ theme }) => theme.greyOutline};
  padding: 10px 0;
  margin: 0 6px;
`;

export const FooterContainer = styled.View`
  margin-top: auto;
  flex-direction: row;
  justify-content: flex-end;
`;

export const FooterDivider = styled(Text)`
  margin: 0 3px;
`;
