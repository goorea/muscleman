import React from 'react';

jest
  .mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
  )
  .mock('@react-native-firebase/analytics', () => () => ({
    logEvent: jest.fn(),
    setUserProperties: jest.fn(),
    setUserId: jest.fn(),
    setCurrentScreen: jest.fn(),
  }))
  .mock('react-native-sound', () => {
    let SoundMock = () => {};

    SoundMock.prototype.setVolume = jest.fn();
    SoundMock.prototype.setNumberOfLoops = jest.fn();
    SoundMock.prototype.play = jest.fn();
    SoundMock.prototype.stop = jest.fn();

    return SoundMock;
  })
  .mock('react-native/Libraries/Animated/NativeAnimatedHelper')
  .doMock('recoil', () => require('recoil/native/recoil'))
  .mock('react-native-device-info', () =>
    require('react-native-device-info/jest/react-native-device-info-mock'),
  )
  .mock('react-native-splash-screen', () => ({
    show: jest.fn(),
    hide: jest.fn(),
  }))
  .mock('react-native-easy-calendar', () => {
    return {
      DateSelectionCalendar: require('react-native/Libraries/Components/View/View'),
    };
  })
  .mock('react-native-gesture-handler', () => {
    const View = require('react-native/Libraries/Components/View/View');

    return {
      Swipeable: View,
      DrawerLayout: View,
      State: {},
      ScrollView: View,
      Slider: View,
      Switch: View,
      TextInput: View,
      ToolbarAndroid: View,
      ViewPagerAndroid: View,
      DrawerLayoutAndroid: View,
      WebView: View,
      NativeViewGestureHandler: View,
      TapGestureHandler: View,
      FlingGestureHandler: View,
      ForceTouchGestureHandler: View,
      LongPressGestureHandler: View,
      PanGestureHandler: View,
      PinchGestureHandler: View,
      RotationGestureHandler: View,
      /* Buttons */
      RawButton: View,
      BaseButton: View,
      RectButton: View,
      BorderlessButton: View,
      /* Other */
      FlatList: View,
      gestureHandlerRootHOC: jest.fn(),
      Directions: {},
    };
  })
  .mock('react-native-draggable-flatlist', () =>
    require('react-native/Libraries/Components/View/View'),
  )
  .mock('@sentry/react-native', () => ({
    init: jest.fn(),
    wrap: (children: React.ReactNode) => children,
  }))
  .mock('@react-native-community/google-signin', () => ({
    GoogleSignin: {
      configure: jest.fn(),
    },
  }))
  .useFakeTimers();
