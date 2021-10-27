export {};

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
  .useFakeTimers();
