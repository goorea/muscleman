import { NativeStackNavigationOptions } from '@react-navigation/native-stack/lib/typescript/src/types';
import { Icon } from 'react-native-elements';
import React from 'react';

export const StackNavigatorDefaultScreenOptions = ({
  navigation,
}: {
  navigation: any;
}): NativeStackNavigationOptions => ({
  title: '',
  headerLeft: () => (
    <Icon
      name="chevron-back-outline"
      type="ionicon"
      onPress={() => navigation.goBack()}
    />
  ),
});
