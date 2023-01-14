import { useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const useAnimation = (
  visible: boolean,
): {
  translateY: Animated.AnimatedInterpolation;
  revert: () => void;
} => {
  const animation = useRef<Animated.Value>(new Animated.Value(0)).current;
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [370, 0],
  });
  const animate = useCallback(
    () =>
      Animated.timing(animation, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start(),
    [animation],
  );
  const revert = useCallback(() => animation.setValue(0), [animation]);

  useEffect(() => {
    if (visible) {
      animate();
    } else {
      revert();
    }
  }, [visible, animate, revert]);

  return {
    translateY,
    revert,
  };
};

export default useAnimation;
