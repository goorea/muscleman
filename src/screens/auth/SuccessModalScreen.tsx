import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from '@src/types/navigation';
import { CompositeScreenProps } from '@react-navigation/native';
import { Animated, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-elements';
import Svg, { Polyline } from 'react-native-svg';
import Sound from 'react-native-sound';

const AnimatedPolyline = Animated.createAnimatedComponent<Polyline>(Polyline);

type P = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'SuccessModal'>,
  NativeStackScreenProps<RootStackParamList>
>;

const SuccessModalScreen: React.FC<P> = ({ navigation, route }) => {
  const {
    theme: { colors },
  } = useTheme();
  const successStyle: TextStyle = {
    color: colors?.grey2,
  };
  const sound = new Sound(require('@src/assets/alarms/success.mp4'));

  const rotateAnimation = new Animated.Value(0);
  const rotateX = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const rotateY = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '180deg'],
  });
  const circleStyles: Animated.WithAnimatedArray<ViewStyle> = [
    {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: colors?.primary,
    },
    {
      transform: [{ rotateX }, { rotateY }, { perspective: 500 }],
    },
  ];

  const checkAnimation = new Animated.Value(0);
  const strokeDashoffset = checkAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  });

  const play = () => {
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
    ]).start(navigation.goBack);
  };

  React.useEffect(play, [play]);

  return (
    <View style={styles.container}>
      <Text style={successStyle}>{route.params.type} 완료!</Text>
      <Text h2 style={styles.welcome1}>
        {route.params.userName}님,
      </Text>
      <Text h2 style={styles.welcome2}>
        환영합니다!
      </Text>
      <View style={styles.circleWrapper}>
        <Animated.View style={circleStyles} />

        <View style={styles.checkWrapper}>
          <Svg width="110" height="110" viewBox="0 0 154 154">
            <AnimatedPolyline
              strokeLinecap="round"
              stroke={colors?.primary}
              strokeWidth={10}
              strokeDasharray={200}
              strokeDashoffset={strokeDashoffset}
              points="43.5,77.8 63.7,97.9 112.2,49.4"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome1: {
    marginTop: 10,
  },
  welcome2: {
    marginTop: -2,
  },
  circleWrapper: {
    marginTop: 24,
  },
  checkWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});

export default SuccessModalScreen;
