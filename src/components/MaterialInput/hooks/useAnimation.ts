import { useEffect, useRef } from 'react';
import { Animated, LayoutRectangle } from 'react-native';

const useAnimation = (
  active: boolean,
  labelLayout: Pick<LayoutRectangle, 'width' | 'height'>,
): {
  translateX: Animated.AnimatedInterpolation;
  translateY: Animated.AnimatedInterpolation;
  scale: Animated.AnimatedInterpolation;
} => {
  const labelAnimation = useRef<Animated.Value>(new Animated.Value(0)).current;
  const translateX = labelAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -34],
  });
  const translateY = labelAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [labelLayout.height, 0],
  });
  const scale = labelAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  useEffect(() => {
    Animated.timing(labelAnimation, {
      toValue: active ? 1 : 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [active, labelAnimation]);

  return {
    translateX,
    translateY,
    scale,
  };
};

export default useAnimation;
