export {};

jest
  .mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
  )
  .doMock('recoil', () => require('recoil/native/recoil'));
