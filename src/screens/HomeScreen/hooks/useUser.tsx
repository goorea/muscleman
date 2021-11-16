import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import Text from '@src/components/Text';
import { getProfileImage } from '@src/functions';
import { userState } from '@src/recoils';
import { MainTabParamList, RootStackParamList } from '@src/types/navigation';

import { ProfileImage } from '../styled';

const useUser = (
  navigation: CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, 'Home'>,
    NativeStackScreenProps<RootStackParamList>
  >['navigation'],
): {
  onPressUser: () => void;
  userNode?: React.ReactElement<{}, ''>;
} => {
  const user = useRecoilValue(userState);

  return {
    onPressUser: useCallback(
      () => navigation.navigate('Profile'),
      [navigation],
    ),
    userNode: useMemo(
      () =>
        user && (
          <>
            <ProfileImage source={getProfileImage(user)} />
            <Text weight="bold">
              {user.nickname}({user.name})
            </Text>
          </>
        ),
      [user],
    ),
  };
};

export default useUser;
