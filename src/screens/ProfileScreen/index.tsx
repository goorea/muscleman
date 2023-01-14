import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import React from 'react';
import { useRecoilValue } from 'recoil';

import Button from '@src/components/Button';
import NeedAuthenticate from '@src/components/NeedAuthenticate';
import SocialIcon from '@src/components/SocialIcon';
import Text from '@src/components/Text';
import ConfirmModal from '@src/components/modals/ConfirmModal';
import { getProfileImage } from '@src/functions';
import { userState } from '@src/recoils';
import { Gender, User } from '@src/types/graphql';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';

// import useEdit from './hooks/useEdit';
// import useEditProfileImage from './hooks/useEditProfileImage';
import useLogout from './hooks/useLogout';
import useWithdrawal from './hooks/useWithdrawal';
import {
  Container,
  Divider,
  // EditButton,
  // EditProfileImage,
  EmailContainer,
  FooterContainer,
  HeaderContainer,
  Info,
  InfoContainer,
  NicknameContainer,
  NicknameEmailContainer,
  FooterDivider,
  ProfileImage,
} from './styled';

type P = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;

const ProfileScreen: React.FC<P> = () => {
  const user = useRecoilValue<User | undefined>(userState);
  // const { editProfileImage, editProfileImageNode } = useEditProfileImage();
  // const { edit, editIconProps } = useEdit();
  const { logout } = useLogout();
  const { confirmModalRef, handleConfirm, withdrawal, loading } =
    useWithdrawal();

  if (!user) {
    return <NeedAuthenticate />;
  }

  return (
    <>
      <Container>
        <HeaderContainer>
          <ProfileImage source={getProfileImage(user)} />
          {/*<EditProfileImage*/}
          {/*  type="clear"*/}
          {/*  onPress={editProfileImage}*/}
          {/*  node={editProfileImageNode}*/}
          {/*/>*/}
          <NicknameEmailContainer>
            <NicknameContainer>
              <Text weight="bold">{user.nickname}</Text>
              {/*<EditButton onPress={edit} type="clear" icon={editIconProps} />*/}
            </NicknameContainer>
            <EmailContainer>
              {user.provider && (
                <>
                  <SocialIcon provider={user.provider} size={18} fill={true} />
                  <Divider />
                </>
              )}
              <Text size={12} color="grey2">
                {user.email}
              </Text>
            </EmailContainer>
          </NicknameEmailContainer>
        </HeaderContainer>

        <InfoContainer>
          <Info>
            <Text weight="bold">{user.name}</Text>
          </Info>
          {!!user.gender && (
            <Info>
              <Text weight="bold">
                {user.gender === Gender.Male ? '남자' : '여자'}
              </Text>
            </Info>
          )}
          {!!user.birth && (
            <Info>
              <Text weight="bold">{dayjs(user.birth).format('YYYYMMDD')}</Text>
            </Info>
          )}
        </InfoContainer>

        {!!user.tel && (
          <InfoContainer>
            <Info>
              <Text weight="bold">{user.tel}</Text>
            </Info>
          </InfoContainer>
        )}

        <FooterContainer>
          <Button
            onPress={logout}
            type="clear"
            title="로그아웃"
            size={12}
            color="grey3"
            weight="normal"
          />
          <FooterDivider size={12} color="grey3">
            |
          </FooterDivider>
          <Button
            onPress={handleConfirm}
            type="clear"
            title="회원탈퇴"
            size={12}
            color="grey3"
            weight="normal"
          />
        </FooterContainer>
      </Container>

      <ConfirmModal
        ref={confirmModalRef}
        message={
          '정말 회원 탈퇴하시겠습니까?\n탈퇴 후에는 복구가 불가능 합니다.'
        }
        onConfirm={withdrawal}
        confirmText="탈퇴"
        loading={loading}
      />
    </>
  );
};

export default ProfileScreen;
