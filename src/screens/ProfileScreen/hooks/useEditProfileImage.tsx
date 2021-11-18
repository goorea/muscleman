import React, { ReactNode, useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import Icon from '@src/components/Icon';
import { getProfileImage } from '@src/functions';
import { userState } from '@src/recoils';
import { User } from '@src/types/graphql';

import { CameraContainer, ProfileImage } from '../styled';

const useEditProfileImage = (): {
  editProfileImage: () => null;
  editProfileImageNode: ReactNode;
} => {
  const user = useRecoilValue<User | undefined>(userState);

  return {
    // TODO: Edit ProfileScreen Image
    editProfileImage: useCallback(() => null, []),
    editProfileImageNode: useMemo<ReactNode>(
      () =>
        !!user && (
          <>
            <ProfileImage source={getProfileImage(user)} />
            <CameraContainer>
              <Icon type="ionicon" name="camera-outline" size={16} />
            </CameraContainer>
          </>
        ),
      [user],
    ),
  };
};

export default useEditProfileImage;
