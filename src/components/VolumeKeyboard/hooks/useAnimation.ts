import { useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent } from 'react-native';
import { useRecoilValue } from 'recoil';

import { selectedEditingVolumeState } from '@src/screens/EditPlanScreen/recoils';
import { EditingVolume } from '@src/types';

import AnimatedInterpolation = Animated.AnimatedInterpolation;

const useAnimation = (
  planID: string,
): {
  transform: { translateY: AnimatedInterpolation }[];
  onLayout: (event: LayoutChangeEvent) => void;
} => {
  const selectedEditingVolume = useRecoilValue<EditingVolume | undefined>(
    selectedEditingVolumeState(planID || ''),
  );
  const containerAnimation = useRef<Animated.Value>(
    new Animated.Value(0),
  ).current;
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const onLayout = ({ nativeEvent }: LayoutChangeEvent) =>
    setContainerHeight(nativeEvent.layout.height);

  useEffect(() => {
    Animated.timing(containerAnimation, {
      toValue: selectedEditingVolume ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [selectedEditingVolume, containerAnimation]);

  return {
    transform: [
      {
        translateY: containerAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [containerHeight, 0],
        }),
      },
    ],
    onLayout,
  };
};

export default useAnimation;
