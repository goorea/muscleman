import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from '@src/types/navigation';

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

export const navigationDispatchMock = jest.fn();
export const navigationNavigateMock = jest.fn();
export const navigationGoBackMock = jest.fn();
export const navigationSetOptionsMock = jest.fn();
export const navigationSetParamsMock = jest.fn();
export const navigationCanGoBackMock = jest.fn();
export const navigationGetParentMock = jest.fn();
export const navigationGetStateMock = jest.fn();
export const navigationReplaceMock = jest.fn();
export const navigationIsFocusedMock = jest.fn();
export const navigationResetMock = jest.fn();
export const navigationPopMock = jest.fn();
export const navigationPushMock = jest.fn();
export const navigationPopToTopMock = jest.fn();
export const navigationAddListenerMock = jest.fn();
export const navigationRemoveListenerMock = jest.fn();
export const navigationMock: CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'SuccessModal'>,
  NativeStackScreenProps<RootStackParamList>
>['navigation'] = {
  dispatch: navigationDispatchMock,
  navigate: navigationNavigateMock,
  goBack: navigationGoBackMock,
  setOptions: navigationSetOptionsMock,
  setParams: navigationSetParamsMock,
  canGoBack: navigationCanGoBackMock,
  getParent: navigationGetParentMock,
  getState: navigationGetStateMock,
  replace: navigationReplaceMock,
  isFocused: navigationIsFocusedMock,
  reset: navigationResetMock,
  pop: navigationPopMock,
  push: navigationPushMock,
  popToTop: navigationPopToTopMock,
  addListener: navigationAddListenerMock,
  removeListener: navigationRemoveListenerMock,
};
