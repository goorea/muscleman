import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useRef } from 'react';
import { Animated, Platform } from 'react-native';
import Sound from 'react-native-sound';

import { AuthStackParamList, RootStackParamList } from '@src/types/navigation';

const usePlay = (
  navigation: CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, 'SuccessModal'>,
    NativeStackScreenProps<RootStackParamList>
  >['navigation'],
): {
  rotateX: Animated.AnimatedInterpolation;
  rotateY: Animated.AnimatedInterpolation;
  strokeDashoffset: Animated.AnimatedInterpolation;
} => {
  const sound = useRef(
    new Sound(require('@src/resources/alarms/success.mp4')),
  ).current;
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const rotateX = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const rotateY = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '180deg'],
  });
  const checkAnimation = useRef(new Animated.Value(0)).current;
  const strokeDashoffset = checkAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  });
  const play = useCallback(() => {
    rotateAnimation.setValue(0);
    checkAnimation.setValue(0);

    setTimeout(() => sound.play(() => null), 500);

    Animated.parallel([
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(checkAnimation, {
        toValue: 1,
        duration: 700,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start(() => navigation.getParent()?.goBack());
  }, [navigation, rotateAnimation, checkAnimation, sound]);

  React.useEffect(() => {
    if (Platform.OS === 'ios' && process.env.NODE_ENV !== 'test') {
      return navigation.addListener('transitionEnd', play);
    }

    play();
  }, [play, navigation]);

  return {
    rotateX,
    rotateY,
    strokeDashoffset,
  };
};

export default usePlay;
