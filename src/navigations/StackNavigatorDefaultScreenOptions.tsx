import { NativeStackNavigationOptions } from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';

import Icon from '@src/components/Icon';

export const StackNavigatorDefaultScreenOptions = ({
  navigation,
}: {
  navigation: any;
}): NativeStackNavigationOptions => {
  const onPress = () => navigation.goBack();

  return {
    title: '',
    headerShadowVisible: false,
    headerLeft: () => (
      <Icon name="chevron-back-outline" type="ionicon" onPress={onPress} />
    ),
  };
};
