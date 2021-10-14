export {};

jest
  .mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
  )
  .mock('@react-native-firebase/analytics', () => {
    return () => ({
      logEvent: jest.fn(),
      setUserProperties: jest.fn(),
      setUserId: jest.fn(),
      setCurrentScreen: jest.fn(),
    });
  })
  .doMock('recoil', () => require('recoil/native/recoil'));
