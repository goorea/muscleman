import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import Button from '@src/components/Button';
import Text from '@src/components/Text';
import { getProfileImage } from '@src/functions';
import { userState } from '@src/recoils';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';

import { Container, ProfileImage } from './styled';

const HomeUser: React.FC = () => {
  const navigation =
    useNavigation<
      CompositeScreenProps<
        BottomTabScreenProps<MainTabParamList, 'Home'>,
        NativeStackScreenProps<RootStackParamList>
      >['navigation']
    >();
  const user = useRecoilValue(userState);
  const onPress = useCallback(
    () => navigation.navigate('Profile'),
    [navigation],
  );

  if (!user) {
    return null;
  }

  return (
    <Button
      onPress={onPress}
      type="clear"
      node={
        <Container>
          <ProfileImage source={getProfileImage(user)} />
          <Text weight="bold">
            {user.nickname}({user.name})
          </Text>
        </Container>
      }
    />
  );
};

export default HomeUser;
