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
export const navigationJumpToMock = jest.fn();
export const navigationMock = {
  dispatch: navigationDispatchMock,
  navigate: navigationNavigateMock,
  goBack: navigationGoBackMock,
  setOptions: navigationSetOptionsMock,
  setParams: navigationSetParamsMock,
  canGoBack: navigationCanGoBackMock,
  getParent: navigationGetParentMock,
  getState: navigationGetStateMock,
  isFocused: navigationIsFocusedMock,
  reset: navigationResetMock,
  addListener: navigationAddListenerMock,
  removeListener: navigationRemoveListenerMock,
  replace: navigationReplaceMock,
  pop: navigationPopMock,
  push: navigationPushMock,
  popToTop: navigationPopToTopMock,
  jumpTo: navigationJumpToMock,
};
