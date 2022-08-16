import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import Button from '@src/components/Button';
import SocialIcon from '@src/components/SocialIcon';
import Text from '@src/components/Text';
import { userState } from '@src/recoils';
import { Gender, User } from '@src/types/graphql';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';

import useEdit from './hooks/useEdit';
import useEditProfileImage from './hooks/useEditProfileImage';
import useLogout from './hooks/useLogout';
import {
  Circle,
  Container,
  Divider,
  EditButton,
  EditProfileImage,
  EmailContainer,
  FooterContainer,
  HeaderContainer,
  Info,
  InfoContainer,
  LoginButton,
  NicknameContainer,
  NicknameEmailContainer,
  NotLoginContainer,
} from './styled';

type P = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;

const ProfileScreen: React.FC<P> = ({ navigation }) => {
  const user = useRecoilValue<User | undefined>(userState);
  const onLogin = useCallback(
    () =>
      navigation.navigate('Auth', {
        screen: 'Login',
      }),
    [navigation],
  );
  const { editProfileImage, editProfileImageNode } = useEditProfileImage();
  const { edit, editIconProps } = useEdit();
  const { logout } = useLogout();

  if (!user) {
    return (
      <NotLoginContainer>
        <Text weight="bold">로그인 후 이용 가능합니다!</Text>
        <Circle>
          <Text size={40}>💪</Text>
        </Circle>
        <LoginButton
          onPress={onLogin}
          type="outline"
          color="primary"
          title="로그인 하러가기"
          size={12}
        />
      </NotLoginContainer>
    );
  }

  return (
    <Container>
      <HeaderContainer>
        <EditProfileImage
          type="clear"
          onPress={editProfileImage}
          node={editProfileImageNode}
        />
        <NicknameEmailContainer>
          <NicknameContainer>
            <Text weight="bold">{user.nickname}</Text>
            <EditButton onPress={edit} type="clear" icon={editIconProps} />
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
      </FooterContainer>
    </Container>
  );
};

export default ProfileScreen;
